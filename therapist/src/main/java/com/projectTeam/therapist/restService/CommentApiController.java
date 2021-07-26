package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.CommentDto;
import com.projectTeam.therapist.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
class CommentApiController {
    @Autowired
    private CommentRepository commentRepository;


    @GetMapping("/comments")
    List<CommentDto> findComments(@RequestParam(required = false, defaultValue="0") Long postId, @RequestParam(required = false, defaultValue="0") Long commentId) {
        if (postId == 0L && commentId == 0L) {
            // 모든 댓글 조회
            return commentRepository.findAll();
        } else if (postId == 0L) {
            // commentId에 대한 댓글 조회
            return commentRepository.findByCommentId(commentId);
        } else {
            // postId에 대한 모든 댓글들 조회
            return commentRepository.findByPostId(postId);
        }
    }

    // newComment 생성
    @PostMapping("/comments")
    CommentDto newComment(@RequestBody CommentDto newComment) {
        return commentRepository.save(newComment);
    }


    // commentId에 해당하는 댓글 삭제
    @DeleteMapping("/comments/{commentId}")
    void deletePost(@PathVariable Long commentId) {
        commentRepository.deleteById(commentId);
    }

    // commentId에 해당하는 멤버의 이름을 리턴, TODO : 검증 필요
//    @GetMapping("/comments/userInfo/{commentId}")
//    String findUserByCommentId(@PathVariable Long commentId) {
//        return null;
//    }
}