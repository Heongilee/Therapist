package com.projectTeam.therapist.userService;

import com.projectTeam.therapist.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Controller
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/kakao/callback")
    public ResponseEntity<String> kakaoCallback(String code) { // @ResponseBody : Data를 리턴해주는 컨트롤러 함수
        String accessToken = userService.getAccessToken(code);
        Map<String, String> userMap = userService.requestKakaoUserInfo(accessToken);

        RestTemplate rt = new RestTemplate();

        UserDto newUser = new UserDto();
        newUser.setUserName(userMap.get("username"));
        newUser.setUserPassword(userMap.get("password"));
        newUser.setUserProfileImage(userMap.get("profile_image"));
        newUser.setUserThumbnailImage(userMap.get("thumbnail_image"));
        newUser.setUserEnabled(true);

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
            add("username", kakaoUser.getUsername());
            add("password", userMap.get("password"));
        }});
    }
}
