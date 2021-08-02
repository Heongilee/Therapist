package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.UserRepository;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// `@RestController`어노테이션을 사용하는 경우, 요청과 응답의 객체변환 및 직렬화/역직렬화를 자동으로 이 jackson 라이브러리가 담당하게 된다.
@RestController
@RequestMapping("/api")
class UserApiController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    List<UserDto> allUsers(){
        return userRepository.findAll();
    }

}