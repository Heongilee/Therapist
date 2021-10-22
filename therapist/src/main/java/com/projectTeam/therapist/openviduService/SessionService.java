package com.projectTeam.therapist.openviduService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectTeam.therapist.RestTemplate.HttpClientConfig;
import com.projectTeam.therapist.model.MediaServerConnectionPool;
import com.projectTeam.therapist.model.SessionDto;
import com.projectTeam.therapist.repository.SessionRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@Service
public class SessionService {
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private MediaServerConnectionPool mscp;
    @Value("${rest.ignore_ssl}")
    private Boolean IGNORE_SSL;


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

    public SessionDto updateSessionModerator(String sessionId, JSONObject requestBody) throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException, JsonProcessingException {
        SessionDto sessionDto = sessionRepository.findById(Long.valueOf(sessionId)).orElse(null);

        // https://ec2-18-234-102-149.compute-1.amazonaws.com/openvidu/api/sessions/354
        // Authorization Basic T1BFTlZJRFVBUFA6dGhlcmFwaXN0
        String url = mscp.PROTOCOL + "://" + mscp.DOMAIN + mscp.URI_PREFIX + "/sessions/" + sessionId;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        headers.add("Authorization", "Basic T1BFTlZJRFVBUFA6dGhlcmFwaXN0");
        HttpEntity<MultiValueMap<String, String>> httpRequest = new HttpEntity<>(headers);

        ResponseEntity<String> response2;
        response2 = new RestTemplate(HttpClientConfig.trustRequestFactory()).exchange(
                url,
                HttpMethod.GET,
                httpRequest,
                String.class
        );
        System.out.println("body = " + response2.getBody());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = null;
        root = objectMapper.readTree(response2.getBody());

        JsonNode connections = root.path("connections");
        for(int i = 0; i < Integer.parseInt(String.valueOf(connections.path("numberOfElements"))); i++) {
            JsonNode connection = objectMapper.readTree(String.valueOf(connections.path("content").path(i).path("clientData")));

            String clientData = connection.toString();
            int lt = 19;
            int rt = 19;
            while (clientData.charAt(rt) != '\\') { rt ++; }
            clientData = clientData.substring(lt, rt);
            if(!clientData.equals(requestBody.get("sessionModerator"))) {
                sessionDto.setSessionModerator(clientData);
                return sessionRepository.save(sessionDto);
            }
        }
        return new SessionDto();
    }
}
