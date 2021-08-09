package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.userService.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

// `@RestController`어노테이션을 사용하는 경우, 요청과 응답의 객체변환 및 직렬화/역직렬화를 자동으로 이 jackson 라이브러리가 담당하게 된다.
@RestController
@RequestMapping("/api")
class UserApiController {
    @Autowired
    private UserService userService;

    @GetMapping("/users")
    List<UserDto> allUsers(){
        return userService.allUsers();
    }

    // 마이페이지를 눌렀을때의 요청 API + 작성글 조회
    @GetMapping("/users/{userName}")
    UserDto findUser(@PathVariable String userName) {
        return userService.findUser(userName);
    }

    @PostMapping("/users")
    UserDto newUser(@RequestBody UserDto userDto) {
        return userService.newUser(userDto);
    }

    @PutMapping("/users/{userId}")
    UserDto replaceUser(@RequestBody UserDto newUser, @PathVariable Long userId) {
        return userService.replaceUser(newUser, userId);
    }

    @DeleteMapping("/users/{userId}")
    void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    // 마이페이지 체크 박스에 따른 게시글 / 댓글 삭제
    @PostMapping("/users/mypage")
    void deleteMyPosts(@RequestBody Map<Long, Long> posts) {
        userService.deleteMyPosts(posts);
    }
}