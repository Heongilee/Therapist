package com.projectTeam.therapist.repository;

import com.projectTeam.therapist.model.PostCategory;
import com.projectTeam.therapist.model.PostDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
/* 더 많은 메소드 키워드들을 찾아보려면...?
 * https://docs.spring.io/spring-data/jpa/docs/2.5.3/reference/html/#jpa.query-methods.query-creation
 */
public interface PostRepository extends JpaRepository<PostDto, Long> {
    List<PostDto> findByPostTitle(String postTitle);
    List<PostDto> findByPostType(PostCategory postType);
    List<PostDto> findByPostTitleOrPostContent(String postTitle, String postContent);
}
