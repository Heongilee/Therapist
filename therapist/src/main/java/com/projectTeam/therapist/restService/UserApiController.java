package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.UserRepository;
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

    // 마이페이지를 눌렀을때의 요청 API + 작성글 조회
    @GetMapping("/users/{userName}")
    UserDto findUser(@PathVariable String userName) {
        return userRepository.findByUserName(userName);
    }

    @PostMapping("/users")
    UserDto newUser(@RequestBody UserDto userDto) {
        return userRepository.save(userDto);
    }

    @PutMapping("/users/{userId}")
    UserDto replaceUser(@RequestBody UserDto newUser, @PathVariable Long userId) {
        return userRepository.findById(userId)
                .map(userDto -> {
//                    userDto.setPosts(newUser.getPosts());
                    userDto.getPosts().clear();                             // 기존의 데이터는 전부 삭제하고 ...
                    userDto.getPosts().addAll(newUser.getPosts());          // 새로운 데이터로 전부 교체한다.
                    for (PostDto post : userDto.getPosts()) {
                        post.setUserDto(userDto);
                    }
                    return userRepository.save(userDto);
                })
                .orElseGet(() -> {
                    newUser.setUserId(userId);
                    return userRepository.save(newUser);
                });
    }

    @DeleteMapping("/users/{userId}")
    void deleteUser(@PathVariable Long userId) {
        userRepository.deleteById(userId);
    }
}