package com.projectTeam.therapist.userService;

import com.projectTeam.therapist.jwt.JwtFilter;
import com.projectTeam.therapist.jwt.TokenProvider;
import com.projectTeam.therapist.model.LoginDto;
import com.projectTeam.therapist.model.TokenDto;
import com.projectTeam.therapist.model.UserDto;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.tokenProvider = tokenProvider;
    }

    @CrossOrigin("*")
    @GetMapping("/kakao/callback")
    public JSONObject kakaoCallback(String accessToken) throws ParseException { // @ResponseBody : Data를 리턴해주는 컨트롤러 함수
        // 프론트에서 Kakao 서버로 인증코드 받아 인증된 사용자면 access token을 보내옴
        Map<String, String> userMap = userService.requestKakaoUserInfo(accessToken);
        System.out.println("accessToken: " + accessToken);
        RestTemplate rt = new RestTemplate();

        // builder 이용하여 UserDto 필드 초기화
        UserDto newUser = UserDto.builder()
                .userName(userMap.get("username"))
                .userPassword(userMap.get("password"))
                .userProfileImage(userMap.get("profile_image"))
                .userThumbnailImage(userMap.get("thumbnail_image"))
                .userEnabled(true)
                .build();

        HttpEntity<UserDto> requestEntity = new HttpEntity<>(newUser);
        rt.exchange(
            "http://localhost:8080/account/register",
            HttpMethod.PUT,
            requestEntity,
            Void.class
        );

        LoginDto loginDto = LoginDto.builder()
                .username(userMap.get("username"))
                .password(userMap.get("password"))
                .build();

        // LoginDto에 사용자 정보 담아 /auth/authenticate(아래 authorize 메서드) 로 보내면 이를 가지고 jwt 토큰 생성 후 반환
        String response = userService.requestPostWithFormData("/auth/authenticate", loginDto);
        JSONParser parser = new JSONParser();
        Object token = parser.parse(response);
        JSONObject res = (JSONObject) token;

        return res;
    }

    // jwt 토큰 받아오기
    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }
}
