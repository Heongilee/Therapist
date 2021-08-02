package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import javax.validation.constraints.NotNull;

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

}
