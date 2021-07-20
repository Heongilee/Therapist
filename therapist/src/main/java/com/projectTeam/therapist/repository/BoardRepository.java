package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
