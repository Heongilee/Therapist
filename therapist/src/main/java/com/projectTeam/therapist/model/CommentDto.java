package com.projectTeam.therapist.model;

import lombok.Data;

import javax.persistence.*;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// depricated
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
@Entity
@Data
public class CommentDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @Enumerated(EnumType.STRING)
    private CommentCategory commentType; // 게시글에 대한 댓글(POST) 인지, 답글에 대한 댓글(REPLY)인지 구분하는 열거형 타입 멤버
    private Long referenceId;
    private String commentContent;
}