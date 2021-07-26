package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.CommentCategory;
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
    List<CommentDto> findComments(@RequestParam(required = false, defaultValue="0") Long commentId,
                                  @RequestParam(required = false, defaultValue="0") Long referenceId,
                                  @RequestParam(required = false, defaultValue="POST") CommentCategory commentType) {
        if (referenceId == 0L && commentId == 0L) {
            // 모든 댓글 조회
            return commentRepository.findAll();
        } else if (referenceId == 0L) {
            // commentId에 대한 댓글 조회
            return commentRepository.findByCommentId(commentId);
        } else {
            // referenceId에 대한 모든 댓글들 조회
            // commentType 쿼리 스트링을 안 주면 기본값으로 POST(게시글)에 대한 아이디를 검색
            // commentType을 "REPLY"로 주면 REPLY(답글)에 대한 아이디를 검색
            return commentRepository.findByReferenceIdAndCommentType(referenceId, commentType);
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