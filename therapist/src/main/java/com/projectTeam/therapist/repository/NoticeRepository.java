package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.NoticeDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoticeRepository extends JpaRepository<NoticeDto, Long> {
    List<NoticeDto> findByUsernameOrderByNoticeCreatedAtDesc(String username);
    Page<NoticeDto> findByUsernameOrderByNoticeCreatedAtDesc(String username, Pageable pageable);

}
