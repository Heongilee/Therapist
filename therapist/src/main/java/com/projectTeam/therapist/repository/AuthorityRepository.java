package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.RoleDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorityRepository extends JpaRepository<RoleDto, String> {
}
