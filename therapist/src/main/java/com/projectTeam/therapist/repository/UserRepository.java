package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.UserDto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserDto, Long> {

    long countByUserName(String userName);

    UserDto findByUserName(String userName);

    @EntityGraph(attributePaths = "roles")
    Optional<UserDto> findOneWithAuthoritiesByUserName(String userName);
}
