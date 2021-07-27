package com.projectTeam.therapist.model;

import javax.persistence.*;

@Entity
public class CommentDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;
    @Enumerated(EnumType.STRING)
    private CommentCategory commentType;
    private Long referenceId;
    private String commentContent;


    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public CommentCategory getCommentType() {
        return commentType;
    }

    public void setCommentType(CommentCategory commentType) {
        this.commentType = commentType;
    }

    public Long getReferenceId() {
        return referenceId;
    }

    public void setReferenceId(Long referenceId) {
        this.referenceId = referenceId;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }
}
