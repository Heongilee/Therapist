package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data // Getter Setter를 자동으로 생성해주는 어노테이션
public class PostDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @ManyToOne
    @JoinColumn(name= "user_id")                        // PostDto 테이블의 어느 컬럼을 JOIN에 이용할 것인지 결정
    /* , referencedColumnName = "user_id")*/                // UserDto의 어느 컬럼값과 조인을 할지 결정. (해당 속성이 PK인 경우 생략 가능.)
    @JsonIgnore                         // @JsonIgnore 를 이용하면 api 요청을 할 때 재귀적으로 호출하여 StackOverflow가 발생하는 것을 해결할 수 있다.
    private UserDto userDto;

    @Enumerated(EnumType.STRING)
    private PostCategory postType;

    @NotNull
    @Size(min=2, max=30, message = "제목은 2자이상 30자 이하입니다.")
    private String postTitle;
    private String postContent;

    @Column(updatable = false)
    private LocalDateTime postCreatedAt;
    private LocalDateTime postUpdatedAt;

    @OneToMany(mappedBy = "postDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostCommentDto> postComments = new ArrayList<>();

    @OneToMany(mappedBy = "postDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyDto> replies = new ArrayList<>();

    public int getCountOfReplies() {
        return replies.size();
    }

    // DB에 INSERT를 날리기전에 해당 메서드를 먼저 실행하여 현재시각과 업데이트 시각을 설정한다.
    @PrePersist
    public void prePersist() {
        // UTC 기준
//        LocalDateTime now = LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime();
        LocalDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
        this.postCreatedAt = now;
        this.postUpdatedAt = now;
    }

    // 해당 테이블로 UPDATE문이 들어왔을때 트리거처럼 호출되며 업데이트 시각을 현재시각으로 설정한다.
    @PreUpdate
    public void preUpdate() {
        // utc
//        this.postUpdatedAt = LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime();
        this.postUpdatedAt = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
    }
}
