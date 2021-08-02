package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class UserDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String userPassword;
    private Boolean userEnabled;

    @ManyToMany
    @JoinTable(
            name = "user_role_dto",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<RoleDto> roles = new ArrayList<>();

    @OneToMany(mappedBy = "userDto", fetch = FetchType.LAZY) // mappedBy : 조인할 상대 테이블의 속성이름을 가져옴, fetch
    private List<PostDto> posts = new ArrayList<>();
}