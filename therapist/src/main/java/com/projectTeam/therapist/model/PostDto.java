package com.projectTeam.therapist.model;

//import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
//@Data // Getter Setter를 자동으로 생성해주는 어노테이션
public class PostDto {
    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public Category getPostType() {
        return postType;
    }

    public void setPostType(Category postType) {
        this.postType = postType;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private Long memberId;
    private Category postType;
    private String postTitle;
    private String postContent;

}
