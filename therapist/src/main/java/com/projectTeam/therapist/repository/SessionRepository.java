package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.SessionDto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<SessionDto, Long> {

}
