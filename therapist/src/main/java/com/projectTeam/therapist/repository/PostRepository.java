package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.PostCategory;
import com.projectTeam.therapist.model.PostDto;
<<<<<<< HEAD
import com.projectTeam.therapist.model.ReplyDto;
=======
>>>>>>> 85ee5513e (feature-apiMyPage :: 마이페이지에서 내가 쓴 게시글 조회 API + 내가 쓴 댓글 조회 API (#35))
import com.projectTeam.therapist.model.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
/* 더 많은 메소드 키워드들을 찾아보려면...?
 * https://docs.spring.io/spring-data/jpa/docs/2.5.3/reference/html/#jpa.query-methods.query-creation
 */
public interface PostRepository extends JpaRepository<PostDto, Long> {
    List<PostDto> findByPostTitle(String postTitle);
    long countByPostType(PostCategory postType);
    Page<PostDto> findByPostType(PostCategory postType, Pageable pageable);
    Page<PostDto> findByUserDto(UserDto userDto, Pageable pageable);
    List<PostDto> findTop6ByOrderByPostCreatedAtDesc();

    PostDto getById(Long postId);
}
