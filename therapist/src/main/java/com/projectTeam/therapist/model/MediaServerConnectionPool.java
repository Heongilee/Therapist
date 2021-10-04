package com.projectTeam.therapist.model;

import org.springframework.stereotype.Component;

@Component
public class MediaServerConnectionPool {
    public static final String PROTOCOL= "https";
    public static final String DOMAIN= "ec2-18-234-102-149.compute-1.amazonaws.com";
    public static final String URI_PREFIX="/openvidu/api";
}