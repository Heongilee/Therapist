package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.CommentDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentDto, Long>{
    List<CommentDto> findByPostId(Long postId);
    List<CommentDto> findByCommentId(Long commentId);
}
