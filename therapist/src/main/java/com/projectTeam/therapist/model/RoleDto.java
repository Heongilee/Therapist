package com.projectTeam.therapist.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class RoleDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    private String roleName;
    @ManyToMany(mappedBy = "roles")
    private List<UserDto> users;
}