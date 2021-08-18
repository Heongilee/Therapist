package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.PostCommentDto;
import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCommentRepository extends JpaRepository<PostCommentDto, Long>{
    Page<PostCommentDto> findByPostDto(PostDto postDto, Pageable pageable);
    Page<PostCommentDto> findByUserDto(UserDto userDto, Pageable pageable);
}
