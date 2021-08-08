package com.projectTeam.therapist.postService;

import com.projectTeam.therapist.model.CommentDto;
import com.projectTeam.therapist.model.PostCommentDto;
import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.*;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private PostCommentRepository postCommentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PostComment에 관한 비즈니스 로직
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Called from CommentApiController (GET /api/postComments )
    public List<PostCommentDto> findAllPostComments() {
        return postCommentRepository.findAll();
    }

    // Called from CommentApiController (GET /api/postComments )
    public PostCommentDto findSinglePostComment(Long postCommentId) {
        return postCommentRepository.findById(postCommentId).orElse(null);
    }

    // Called from CommentApiController (POST /api/postComments )
    public PostCommentDto newPostComment(JSONObject params, String userName, Long postId) {
        String postCommentContent = (params == null) ? "" : (String) params.get("postCommentContent");
        UserDto foundUserDto = userRepository.findByUserName(userName);
        PostDto foundPostDto = postRepository.findById(postId).orElse(null);

        // build DTO object.
        PostCommentDto newPostComment = new PostCommentDto();
        newPostComment.setPostCommentContent(postCommentContent);
        newPostComment.setUserDto(foundUserDto);
        newPostComment.setPostDto(foundPostDto);

        return postCommentRepository.save(newPostComment);
    }

    // Called from CommentApiController (DELETE /api/postComments )
    public void deletePostComment(Long postCommentId) {
        postCommentRepository.deleteById(postCommentId);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ReplyComment에 관한 비즈니스 로직
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
