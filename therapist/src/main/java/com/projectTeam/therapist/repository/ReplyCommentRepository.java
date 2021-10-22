package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.ReplyCommentDto;
import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.model.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReplyCommentRepository extends JpaRepository<ReplyCommentDto, Long> {
    Page<ReplyCommentDto> findByReplyDto(ReplyDto replyDto, Pageable pageable);
    List<ReplyCommentDto> findByUserDto(UserDto userDto);
}