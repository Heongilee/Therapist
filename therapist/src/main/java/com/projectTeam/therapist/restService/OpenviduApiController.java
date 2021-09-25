package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.openviduService.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/openvidu")
public class OpenviduApiController {
    @Autowired
    private SessionService sessionService;
    // POST sessionId + 테이블에 튜플 삽입

    // GET 방식 방제목 뿌려주는 REST API 만들기
}
