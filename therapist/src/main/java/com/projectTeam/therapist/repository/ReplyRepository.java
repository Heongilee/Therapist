package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.model.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReplyRepository extends JpaRepository<ReplyDto, Long> {

    Page<ReplyDto> findByUserDto(UserDto userDto, Pageable pageable);

}
