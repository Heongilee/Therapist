package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
public class PostCommentDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postCommentId;
    private String postCommentContent;

    @ManyToOne
    @JoinColumn(name="post_id")                     // postDto 테이블의 post_id 컬럼값을 JOIN에 이용한다.
    @JsonIgnore
    private PostDto postDto;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private UserDto userDto;

    @Column(updatable = false)
    private LocalDateTime commentCreatedAt;
    private LocalDateTime commentUpdatedAt;

    // DB에 INSERT를 날리기전에 해당 메서드를 먼저 실행하여 현재시각과 업데이트 시각을 설정한다.
    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.commentCreatedAt = now;
        this.commentUpdatedAt = now;
    }

    // 해당 테이블로 UPDATE문이 들어왔을때 트리거처럼 호출되며 업데이트 시각을 현재시각으로 설정한다.
    @PreUpdate
    public void preUpdate() {
        this.commentUpdatedAt = LocalDateTime.now();
    }
}