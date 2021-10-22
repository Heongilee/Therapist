package com.projectTeam.therapist.model;

import org.springframework.stereotype.Component;

@Component
public class MediaServerConnectionPool {
    public static final String PROTOCOL= "https";
    public static final String DOMAIN= "therapist-chat.shop";
    public static final String URI_PREFIX="/openvidu/api";
}
