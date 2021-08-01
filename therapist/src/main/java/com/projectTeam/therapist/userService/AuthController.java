package com.projectTeam.therapist.userService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectTeam.therapist.model.KakaoProfileDto;
import com.projectTeam.therapist.model.OAuthTokenDto;
<<<<<<< HEAD
import org.springframework.beans.factory.annotation.Autowired;
=======
>>>>>>> 86507d636 (feature-KakaoLogin :: 카카오 서비스의 access_token 발급받기 + access_token으로 유저 정보 요청하기 + Spring Security로 권한에 따른 페이지 처리)
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import java.util.UUID;

@Controller
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/kakao/callback")
    public ModelAndView kakaoCallback(String code) { // @ResponseBody : Data를 리턴해주는 컨트롤러 함수
        ModelAndView mav = new ModelAndView();
        mav.setViewName("account/signup_info");
        mav.addObject("data", userService.getAccessToken(code));

        return mav;
    }
}
