package com.projectTeam.therapist.userService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectTeam.therapist.TherapistApplication;
import com.projectTeam.therapist.model.*;
import com.projectTeam.therapist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

// @Service 어노테이션을 통해 비즈니스 로직을 작성할 수 있게 된다.
// 또한, 이렇게 서비스 클래스로 따로 빼면 단위 테스트를 수행할때에도 용이하다.
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder; // /configuration/WebSecurityConfig에서 Bean객체로 등록함.

    private final String clientId = "bee5cefdb5d9d94c0b32f71cf0de38e7";
    private final String clientSecret = "LcnyKGSgPVuOolspq5ococnDLfrlDqXM";
    private final String redirectUri = "http://localhost:8080/auth/kakao/callback";

    public UserDto save(UserDto user) {
        if (userRepository.countByUserName(user.getUserName()) >= 1L) {
            return null;
        } else {
            // 비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(user.getUserPassword());
            user.setUserPassword(encodedPassword);

            // 기본 활성화 상태
            user.setUserEnabled(true);

            RoleDto roleDto = new RoleDto();
            roleDto.setRoleId(1L);              // 기본 권한 1번 == ROLE_USER
            user.getRoles().add(roleDto);

            return userRepository.save(user);
        }
    }

    //  authorizationCode 값으로 카카오 서버에서 access_token값을 받음.
    public String getAccessToken(String code) {
        // POST방식으로 Key=Value 데이터를 요청(카카오에게)
        // 과거 Java에서 사용한 방식 : HttpsURLConnection, Retrofit2 (안드로이드에서 많이 씀), OkHttp
        RestTemplate rt = new RestTemplate();

        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", clientSecret);

        // Http 요청하기 - POST 방식 - 그리고 response 변수에 응답 받음.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON to Object 라이브러리
        // Gson, Json Simple, ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthTokenDto oAuthTokenDto = null;
        try {
            oAuthTokenDto = objectMapper.readValue(response.getBody(), OAuthTokenDto.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("카카오 엑세스 토큰 = " + oAuthTokenDto.getAccess_token());

        return oAuthTokenDto.getAccess_token();
    }

    public Map<String, String> requestKakaoUserInfo(String accessToken) {
        RestTemplate rt2 = new RestTemplate();

        // HttpHeader 오브젝트 생성
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer " + accessToken);
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http 요청하기 - POST 방식 - 그리고 response 변수에 응답 받음.
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers2);
        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper2 = new ObjectMapper();
        KakaoProfileDto kakaoProfileDto = null;
        try {
            kakaoProfileDto = objectMapper2.readValue(response2.getBody(), KakaoProfileDto.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        System.out.println("테라피스트의 유저네임 = " + kakaoProfileDto.getKakao_account().getEmail() + "_" + kakaoProfileDto.getId());
//        System.out.println("테라피스트의 이메일 = " + kakaoProfileDto.getKakao_account().getEmail());

        KakaoProfileDto finalKakaoProfileDto = kakaoProfileDto;
        return new HashMap<>(){{
            put("username", finalKakaoProfileDto.getKakao_account().getEmail() + "_" + finalKakaoProfileDto.getId());
            put("password", String.valueOf(UUID.randomUUID()));
            put("profile_image", finalKakaoProfileDto.getProperties().getProfile_image());
            put("thumbnail_image", finalKakaoProfileDto.getProperties().getThumbnail_image());
        }};
    }

    public boolean isAlreadySignUp(String username) {
        return (userRepository.countByUserName(username) >= 1) ? true : false;
    }

    public UserDto findKakaoUser(String username) {
        return userRepository.findByUserName(username);
    }

    public ResponseEntity<String> requestPostWithFormData(String contextPath, MultiValueMap<String, String> params) {
        String url = "http://localhost:8080" + contextPath;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(params, headers);

        return restTemplate.postForEntity( url, request , String.class );
    }

    public UserDto modifyUserPassword(UserDto newUser) {
        UserDto foundUser = userRepository.findByUserName(newUser.getUserName());

        if (foundUser == null) {
            // 기존에 없는 경우 새로 객체를 만들어서 저장하기.
            // 비밀번호 암호화
            newUser.setUserPassword(passwordEncoder.encode(newUser.getUserPassword()));

            // 기본 활성화 상태
            newUser.setUserEnabled(true);
            RoleDto roleDto = new RoleDto();
            roleDto.setRoleId(1L);              // 기본 권한 1번 == ROLE_USER
            newUser.getRoles().add(roleDto);

            return userRepository.save(newUser);
        } else {
            foundUser.setUserPassword(passwordEncoder.encode(newUser.getUserPassword()));
            return userRepository.save(foundUser);
        }
    }
}