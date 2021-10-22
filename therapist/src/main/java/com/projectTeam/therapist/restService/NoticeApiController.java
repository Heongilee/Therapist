package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.postService.NoticeService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class NoticeApiController {
    @Autowired
    private NoticeService noticeService;

    @GetMapping("/notice/{username}")
    JSONObject findAllNotices(@PathVariable String username, @PageableDefault(size = 6) final Pageable pageable) {
        return noticeService.findByUsername(username, pageable);
    }

    @GetMapping("/notice/total/{username}")
    int findNoticeAmount(@PathVariable String username) {
        return noticeService.findTotalNotice(username);
    }
}
