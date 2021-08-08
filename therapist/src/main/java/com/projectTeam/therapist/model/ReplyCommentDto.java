package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

public class ReplyCommentDto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyCommentId;
    private String replyCommentContent;

//    @ManyToOne
//    @JoinColumn(name = "reply_id")
//    @JsonIgnore
//    private ReplyDto replyDto;
//
//    @ManyToMany
//    @JoinColumn(name = "user_id")
//    @JsonIgnore
//    private UserDto userDto;
}
