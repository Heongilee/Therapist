package com.projectTeam.therapist.userService;

import com.projectTeam.therapist.jwt.JwtFilter;
import com.projectTeam.therapist.jwt.TokenProvider;
import com.projectTeam.therapist.model.LoginDto;
import com.projectTeam.therapist.model.TokenDto;
import com.projectTeam.therapist.model.UserDto;
import org.json.simple.JSONObject;
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

    @GetMapping("/kakao/callback")
    public ResponseEntity<String> kakaoCallback(String code) { // @ResponseBody : Data를 리턴해주는 컨트롤러 함수
        String accessToken = userService.getAccessToken(code);
        Map<String, String> userMap = userService.requestKakaoUserInfo(accessToken);

        RestTemplate rt = new RestTemplate();

        // builder 이용하여 UserDto 필드 초기화
        UserDto newUser = UserDto.builder()
                .userName(userMap.get("username"))
                .userPassword(userMap.get("password"))
                .userProfileImage(userMap.get("profile_image"))
                .userThumbnailImage(userMap.get("thumbnail_image"))
                .userEnabled(true)
                .build();
//        UserDto newUser = new UserDto();
//        newUser.setUserName(userMap.get("username"));
//        newUser.setUserPassword(userMap.get("password"));
//        newUser.setUserProfileImage(userMap.get("profile_image"));
//        newUser.setUserThumbnailImage(userMap.get("thumbnail_image"));
//        newUser.setUserEnabled(true);

        HttpEntity<UserDto> requestEntity = new HttpEntity<>(newUser);
        rt.exchange(
            "http://localhost:8080/account/register",
            HttpMethod.PUT,
            requestEntity,
            Void.class
        );

        UserDto kakaoUser = userService.findKakaoUser(userMap.get("username"));
//        System.out.println("Encrypted Password = " + kakaoUser.getUserPassword());
        return userService.requestPostWithFormData("/account/login", new LinkedMultiValueMap<String, String>() {{
            add("username", kakaoUser.getUserName());
            add("password", userMap.get("password"));
        }});
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
