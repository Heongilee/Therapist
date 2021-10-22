package com.projectTeam.therapist.notice;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;

@Component
public class ReplyEchoHandler extends TextWebSocketHandler {

    Map<String, WebSocketSession> sessionMap = new HashMap<String, WebSocketSession>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("websocket connect" + session);

        if (sessionMap.containsValue(session.getId()) == false) {
            JSONObject obj = new JSONObject();
            obj.put("type", "getUsername");
            session.sendMessage(new TextMessage(obj.toJSONString()));
        }
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //chat service

        String msg = message.getPayload();
        JSONObject parsedMsg = jsonToObjectParser(msg);
        System.out.println("received msg: " + parsedMsg);

        if (parsedMsg.get("type").equals("register")) {
            sessionMap.put((String) parsedMsg.get("username"), session);
            System.out.println("session Map: "+sessionMap);
        }
        else if (parsedMsg.get("type").equals("message")) {
            for (String username : sessionMap.keySet()) {
                if (username.equals(parsedMsg.get("receivedUserName"))) {
                    System.out.println("find receiver, parsedMsg:" + parsedMsg);
                    WebSocketSession wss = sessionMap.get(username);
                    try {
                        wss.sendMessage(new TextMessage(parsedMsg.toJSONString()));
                    }catch(Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessionMap.remove(session);
    }

    // get Id of session
    private String getMemberId(WebSocketSession session) {
        // TODO: 세션 목록 중에서 해당하는 세션 찾기
        Map<String, Object> httpSession = session.getAttributes();

        return session.getId();
    }
    private static JSONObject jsonToObjectParser(String jsonStr) {
        JSONParser parser = new JSONParser();
        JSONObject obj = null;
        try {
            obj = (JSONObject) parser.parse(jsonStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return obj;
    }
}