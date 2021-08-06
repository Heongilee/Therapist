package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

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
}