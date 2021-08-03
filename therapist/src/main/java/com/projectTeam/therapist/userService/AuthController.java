package com.projectTeam.therapist.userService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectTeam.therapist.TherapistApplication;
import com.projectTeam.therapist.model.KakaoProfileDto;
import com.projectTeam.therapist.model.OAuthTokenDto;
import com.projectTeam.therapist.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/kakao/callback")
    public ResponseEntity<String> kakaoCallback(String code) { // @ResponseBody : Data를 리턴해주는 컨트롤러 함수
        String accessToken = userService.getAccessToken(code);
        Map<String, String> userMap = userService.requestKakaoUserInfo(accessToken);
        String url;

        System.out.println("Original Password = " + userMap.get("password"));

        RestTemplate rt = new RestTemplate();

        UserDto newUser = new UserDto();
        newUser.setUserName(userMap.get("username"));
        newUser.setUserPassword(userMap.get("password"));

        HttpEntity<UserDto> requestEntity = new HttpEntity<>(newUser);
        rt.exchange(
            "http://localhost:8080/account/register",
            HttpMethod.PUT,
            requestEntity,
            Void.class
        );

        UserDto kakaoUser = userService.findKakaoUser(userMap.get("username"));
        System.out.println("Encrypted Password = " + kakaoUser.getUserPassword());
        return userService.requestPostWithFormData("/account/login", new LinkedMultiValueMap<String, String>() {{
            add("username", kakaoUser.getUserName());
            add("password", userMap.get("password"));
        }});

//        return "redirect:/"; // TODO : 로그인 테스트해보고 수정할 것.
    }
}
