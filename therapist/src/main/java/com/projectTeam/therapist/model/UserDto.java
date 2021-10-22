package com.projectTeam.therapist.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Builder                    // @Builder 애노테이션은 빌드 클래스를 자동으로 만들어주는데 이 과정에서 디폴트 생성자 대신 모든 필드값을 가지는 생성자만 생성
@AllArgsConstructor         // JPA 쓰려면 디폴트 생성자가 필요하므로 @Builder 를 함께 사용하려는 경우에는 @NoArgsConstructor 와 @AllArgsConstructor 를 추가해주는 방식으로 문제 해결
@NoArgsConstructor
public class UserDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String userPassword;
    private Boolean userEnabled;
    @Builder.Default
    private String userGrade = "BRONZE";
    @Builder.Default
    private int userStars = 0;

//  @Builder 필드를 특정값으로 지정해놓고 @Builder 가 새로운 객체 생성시 값을 오버라이딩해버리면 미리 초기화해놓은 값과 충돌이 날 수 있다는 경고를 날린다
//  컴파일이 안되거나 빌더클래스를 안 만들어주는 것도 아니지만 찜짐하니 이를 해결하기 위한 두 가지 옵션
//  1. final : 필드 값을 고정시키는 것이 목적이라면 final 을 붙여 선언 ( private final ~~ )
//  2. @Builder.Default : 일단 특정값으로 초기화해놓고 특정 경우마다 다른 값으로 초기화
    @Builder.Default
    private String userProfileImage = "https://via.placeholder.com/640";
    @Builder.Default
    private String userThumbnailImage = "https://via.placeholder.com/110";

    @ManyToMany
    @JoinTable(
            name = "user_role_dto",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleDto> roles;

    // TODO: User 정보 어디까지 불러올건지, JsonIgnore 어디어디 적용할건지 . . so difficult
    // mappedBy : 조인할 상대 테이블의 속성이름을 가져옴
    // cascade : PostDto를 참조하고 있는 상황에서 UserDto에 변경이 일어날 경우 연쇄 작용으로 어떤 처리를 할지 옵션을 줄 수 있음.
    // orphanRemoval : 부모가 없는 데이터를 지울때 유용한 옵션 (default값 : false)
    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostDto> posts;

    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostCommentDto> userPostComments;

    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyDto> replies;

    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyCommentDto> userReplyComments;
}