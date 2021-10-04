package com.projectTeam.therapist.openviduService;

import com.projectTeam.therapist.RestTemplate.ApiService;
import com.projectTeam.therapist.model.MediaServerConnectionPool;
import com.projectTeam.therapist.model.SessionDto;
import com.projectTeam.therapist.repository.SessionRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class SessionService {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MediaServerConnectionPool mscp;
    @Autowired
    private ApiService<Response> apiService;


    public SessionDto createSession(JSONObject requestBody) {
        SessionDto sessionDto = SessionDto.builder()
                .sessionTitle((String) requestBody.get("sessionTitle"))
                .numConnectedObject(0)
                .sessionModerator((String) requestBody.get("sessionModerator"))
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
            item.put("numConnectedObject", session.getNumConnectedObject());
            item.put("sessionModerator", session.getSessionModerator());
            result.add(item);
        }

        return result;
    }

    public JSONObject retrieveSession(Long sessionId) {
        SessionDto sessionDto = sessionRepository.findById(sessionId).orElse(null);

        JSONObject result = new JSONObject();
        result.put("sessionId", sessionDto.getSessionId());
        result.put("sessionTitle", sessionDto.getSessionTitle());
        result.put("sessionModerator", sessionDto.getSessionModerator());

        return result;
    }

    public void removeSession(Long sessionId) {
        sessionRepository.deleteById(sessionId);
    }

    public JSONObject incrementConnectedObject(Long sessionId) {
        SessionDto sessionDto = sessionRepository.findById(sessionId).orElse(null);
        JSONObject result = new JSONObject();
        String myStatus = (sessionDto.getNumConnectedObject() >= 6) ? "FAILED" : "SUCCESS";
        result.put("status", myStatus);
        if (sessionDto.getNumConnectedObject() < 6) {
            sessionDto.setNumConnectedObject(sessionDto.getNumConnectedObject() + 1);
        }
        result.put("numConnectedObject", sessionDto.getNumConnectedObject());
        sessionRepository.save(sessionDto);

        return result;
    }

    public JSONObject decrementConnectedObject(Long sessionId) {
        SessionDto sessionDto = sessionRepository.findById(sessionId).orElse(null);
        JSONObject result = new JSONObject();
        String myStatus = (sessionDto.getNumConnectedObject() <= 0) ? "FAILED" : "SUCCESS";
        result.put("status", myStatus);
        if (sessionDto.getNumConnectedObject() > 0) {
            sessionDto.setNumConnectedObject(sessionDto.getNumConnectedObject() - 1);
        }
        result.put("numConnectedObject", sessionDto.getNumConnectedObject());
        sessionRepository.save(sessionDto);

        return result;
    }

    public SessionDto updateSessionModerator(Long sessionId, JSONObject requestBody) {
        // https://ec2-18-234-102-149.compute-1.amazonaws.com/openvidu/api/sessions/354
        String url = mscp.PROTOCOL + "://" + mscp.DOMAIN + mscp.URI_PREFIX + "/sessions/" + String.valueOf(sessionId);

//        SessionDto sessionDto = sessionRepository.findById(sessionId).orElse(null);
//
//        sessionDto.setSessionModerator((String) requestBody.get("sessionModerator"));
//        return sessionRepository.save(sessionDto);
    }
}
