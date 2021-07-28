package com.projectTeam.therapist.model;

//import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

@Entity
//@Data // Getter Setter를 자동으로 생성해주는 어노테이션
public class PostDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private Long memberId;
    @Enumerated(EnumType.STRING)
    private PostCategory postType;
    @NotNull
    @Size(min=2, max=30, message = "제목은 2자이상 30자 이하입니다.")
    private String postTitle;
    private String postContent;


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

    public PostCategory getPostType() {
        return postType;
    }

    public void setPostType(PostCategory postType) {
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

}
