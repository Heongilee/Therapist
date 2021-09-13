package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.NoticeDto;
import com.projectTeam.therapist.model.UserDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<NoticeDto, Long> {
    List<NoticeDto> findByUsername(String username);
}
