package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.CommentCategory;
import com.projectTeam.therapist.model.CommentDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentDto, Long>{
    List<CommentDto> findByReferenceIdAndCommentType(Long referenceId, CommentCategory commentType);
//    List<CommentDto> findByReferenceId(Long referenceId);
    List<CommentDto> findByCommentId(Long commentId);
}
