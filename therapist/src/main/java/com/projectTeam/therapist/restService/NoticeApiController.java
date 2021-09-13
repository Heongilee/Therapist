package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.postService.NoticeService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class NoticeApiController {
    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notice/{username}")
    JSONObject findAllNotices(@PathVariable String username) {
        return noticeService.findByUsername(username);
    }

    @GetMapping("/notice/total/{username}")
    int findNoticeAmount(@PathVariable String username) {
        return noticeService.findTotalNotice(username);
    }
}
