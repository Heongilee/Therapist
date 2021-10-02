package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.SessionDto;
import com.projectTeam.therapist.openviduService.SessionService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/openvidu")
public class OpenviduApiController {
    @Autowired
    private SessionService sessionService;
    // POST sessionId + 테이블에 튜플 삽입
    @PostMapping("/session")
    SessionDto createSession(@RequestBody JSONObject requestBody) {
        return sessionService.createSession(requestBody);
    }

    // GET 방식 방제목 뿌려주는 REST API 만들기
    @GetMapping("/sessions")
    JSONArray retrieveSessions() {
        return sessionService.retrieveSessions();
    }

    @GetMapping("/session/{sessionId}")
    JSONObject retrieveSession(@PathVariable Long sessionId) {
        return sessionService.retrieveSession(sessionId);
    }

    // DELETE 방식으로 해당 세션 종료시키기
    @DeleteMapping("/session/{sessionId}")
    void removeSession(@PathVariable Long sessionId) {
        sessionService.removeSession(sessionId);
    }
}
