package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserDto, Long> {
    long countByUserName(String userName);
}
