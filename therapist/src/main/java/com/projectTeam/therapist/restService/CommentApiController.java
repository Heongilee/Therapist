package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.CommentCategory;
import com.projectTeam.therapist.model.CommentDto;
import com.projectTeam.therapist.model.PostCommentDto;
import com.projectTeam.therapist.model.ReplyCommentDto;
import com.projectTeam.therapist.postService.CommentService;
import com.projectTeam.therapist.repository.CommentRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
class CommentApiController {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PostComment에 관한 API
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @Autowired
    private CommentService commentService;

    // 모든 게시글 댓글(PostComment) 조회
    @GetMapping("/postComments")
    List<PostCommentDto> findAllPostComments() {
        return commentService.findAllPostComments();
    }

    // postId에 대한 모든 게시글 댓글을 조회한다.
    @GetMapping("/postComments/{postId}")
    JSONObject findAllPostCommentsByPostId(@PathVariable Long postId, @PageableDefault(size = 6) final Pageable pageable) {
        return commentService.findAllPostCommentsByPostId(postId, pageable);
    }

    // 게시글 댓글(PostComment) 생성
    @PostMapping("/postComments/{userName}/{postId}")
    PostCommentDto newPostComment(@RequestBody JSONObject params, @PathVariable String userName, @PathVariable Long postId) {
        return commentService.newPostComment(params, userName, postId);
    }

    // 게시글 댓글(PostComment) 삭제
    @DeleteMapping("/postComments/{postCommentId}")
    void deletePostComment(@PathVariable Long postCommentId) {
        commentService.deletePostComment(postCommentId);
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ReplyComment에 관한 API
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 답글 댓글(ReplyComment) 생성
    @PostMapping("/replyComments/{userName}/{replyId}")
    ReplyCommentDto newReplyComment(@RequestBody JSONObject params, @PathVariable String userName, @PathVariable Long replyId) {
        return commentService.newReplyComment(params, userName, replyId);
    }

    // 특정 답글(ReplyComment) 댓글 조회
    @GetMapping("/replyComments/{replyId}")
    JSONObject replyCommentsList(@PathVariable Long replyId, @PageableDefault(size = 6) final Pageable pageable) {
        return commentService.findReplyComments(replyId, pageable);
    }

    // 답글 댓글(ReplyComment) 삭제
    @DeleteMapping("/replyComments/{replyCommentId}")
    void deleteReplyComment(@PathVariable Long replyCommentId) {
        commentService.deleteReplyComment(replyCommentId);
    }
}