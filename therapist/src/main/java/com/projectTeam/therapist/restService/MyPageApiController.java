package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.userService.UserService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class MyPageApiController {
    @Autowired
    private UserService userService;

    @GetMapping("/mypage/{userName}")
    public JSONObject requestPostsOrCommentsOrReplies(@PathVariable String userName, @RequestParam(required = false, defaultValue = "myPosts") String menuType) {
        return userService.searchMyData(userName, menuType);
    }
}
