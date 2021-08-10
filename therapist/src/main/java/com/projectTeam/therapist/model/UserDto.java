package com.projectTeam.therapist.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
public class UserDto implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String userPassword;
    private Boolean userEnabled;
    private String userProfileImage = "https://via.placeholder.com/640";
    private String userThumbnailImage = "https://via.placeholder.com/110";

    @ManyToMany
    @JoinTable(
            name = "user_role_dto",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<RoleDto> roles = new ArrayList<>();

    // mappedBy : 조인할 상대 테이블의 속성이름을 가져옴
    // cascade : PostDto를 참조하고 있는 상황에서 UserDto에 변경이 일어날 경우 연쇄 작용으로 어떤 처리를 할지 옵션을 줄 수 있음.
    // orphanRemoval : 부모가 없는 데이터를 지울때 유용한 옵션 (default값 : false)
    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostDto> posts = new ArrayList<>();

    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostCommentDto> userPostComments = new ArrayList<>();

    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyDto> relies = new ArrayList<>();

    @OneToMany(mappedBy = "userDto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyCommentDto> userReplyComments = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<GrantedAuthority> auth = new ArrayList<GrantedAuthority>();
        for (RoleDto role : this.roles) {
            auth.add(new SimpleGrantedAuthority(role.getRoleName()));
        }
        return auth;
    }

    @Override
    public String getPassword() {
        return this.userPassword;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.userEnabled;
    }
}