package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.boardService.BoardServiceImpl;
import com.projectTeam.therapist.boardService.ReplyService;
import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ReplyApiController {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ReplyService replyService;

    // postId에 따른 답글 조회
    @GetMapping("/replies/{postId}")
    JSONObject find(@PathVariable Long postId, @PageableDefault(size = 6) final Pageable pageable) {
        return replyService.findReplies(postId, pageable);
    }

    // 답글 생성
    @PostMapping("/replies/{postId}")
    JSONObject create(@RequestBody JSONObject requestBody, @PathVariable Long postId) {
        return replyService.writeReply(requestBody, postId);
    }

    // 답글 수정
    @PutMapping("replies/{replyId}")
    JSONObject modify(@RequestBody() JSONObject modifiedReply,
                         @PathVariable Long replyId) {
        return replyService.modifyReply(modifiedReply, replyId);
    }

    // 답글 삭제
    @DeleteMapping("/replies/{replyId}")
    void delete(@PathVariable Long replyId) {
        replyService.deleteReply(replyId);
    }

    // star point
    @GetMapping("/star/{replyId}")
    void grade(@PathVariable Long replyId, @RequestParam int point) {
        replyService.makeGrade(replyId, point);
    }
}