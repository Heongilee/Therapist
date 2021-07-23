package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.ReplyDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<ReplyDto, Long> {

    List<ReplyDto> findByPostId(Long postId);

}
