package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.SessionDto;
import com.projectTeam.therapist.openviduService.SessionService;
import lombok.SneakyThrows;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;

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

    // PUT 연결객체 참가시켜 카운트 증가 API
    @PutMapping("/session/{sessionId}/enter")
    JSONObject incrementConnectedObject(@PathVariable Long sessionId) {
        return sessionService.incrementConnectedObject(sessionId);
    }

    // PUT 연결객체 참가시켜 카운트 감소 API
    @PutMapping("/session/{sessionId}/exit")
    JSONObject decrementConnectedObject(@PathVariable Long sessionId) {
        return sessionService.decrementConnectedObject(sessionId);
    }

    // PUT 방장 교체하는 API
    @SneakyThrows
    @PutMapping("/session/{sessionId}")
    SessionDto updateSessionModerator(@PathVariable String sessionId, @RequestBody JSONObject requestBody) throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException {
        return sessionService.updateSessionModerator(sessionId, requestBody);
    }

    // DELETE 방식으로 해당 세션 종료시키기
    @DeleteMapping("/session/{sessionId}")
    void removeSession(@PathVariable Long sessionId) {
        sessionService.removeSession(sessionId);
    }
}
