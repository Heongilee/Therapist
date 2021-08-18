package com.projectTeam.therapist.notice;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Component
public class ReplyEchoHandler extends TextWebSocketHandler {

    List<WebSocketSession> sessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("연결 됨" + session);
//        String senderId = getMemberId(session);
        sessions.add(session);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        //chat service

        String senderId = getMemberId(session);
        String msg = message.getPayload();
        System.out.println("received msg: " + msg);
        if (msg != null) {
            String[] strings = msg.split(",");
            if (strings != null) {
                String caller = strings[0];
                int caller_id = Integer.parseInt(strings[1]);
                String receiver = strings[2];
                String content = strings[3];
//                WebSocketSession targetSession = sessions.get(receiver);

                // 실시간 접속시
                for (WebSocketSession webSocketSession : sessions) {
                    if (webSocketSession.isOpen() && !session.getId().equals(webSocketSession.getId())) {
                        WebSocketSession targetSession = webSocketSession;
                        TextMessage tmpMsg = new TextMessage(caller + " send you a message: " + content);
                        targetSession.sendMessage(tmpMsg);
                    }
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        sessions.remove(session);
    }

    // get Id of session
    private String getMemberId(WebSocketSession session) {
        // TODO: 세션 목록 중에서 해당하는 세션 찾기
        Map<String, Object> httpSession = session.getAttributes();

        return session.getId();
    }
}
