package com.projectTeam.therapist.openviduService;

import com.projectTeam.therapist.model.SessionDto;
import com.projectTeam.therapist.repository.SessionRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {
    @Autowired
    private SessionRepository sessionRepository;

    public SessionDto createSession(JSONObject requestBody) {
        SessionDto sessionDto = SessionDto.builder()
                .sessionTitle((String) requestBody.get("sessionTitle"))
                .build();

        return sessionRepository.save(sessionDto);
    }

    public JSONArray retrieveSessions() {
        List<SessionDto> sessions = sessionRepository.findAll();
        JSONArray result = new JSONArray();

        for (SessionDto session : sessions) {
            JSONObject item = new JSONObject();
            item.put("sessionId", session.getSessionId());
            item.put("sessionTitle", session.getSessionTitle());
            result.add(item);
        }

        return result;
    }

    public JSONObject retrieveSession(Long sessionId) {
        SessionDto sessionDto = sessionRepository.findById(sessionId).orElse(null);

        JSONObject result = new JSONObject();
        result.put("sessionId", sessionDto.getSessionId());
        result.put("sessionTitle", sessionDto.getSessionTitle());

        return result;
    }

    public void removeSession(Long sessionId) {
        sessionRepository.deleteById(sessionId);
    }
}
