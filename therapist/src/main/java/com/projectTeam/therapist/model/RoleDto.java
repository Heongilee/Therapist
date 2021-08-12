package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Builder
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoleDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore                         // @JsonIgnore 를 이용하면 api 요청을 할 때 재귀적으로 호출하여 StackOverflow가 발생하는 것을 해결할 수 있다.
    private List<UserDto> users;
}