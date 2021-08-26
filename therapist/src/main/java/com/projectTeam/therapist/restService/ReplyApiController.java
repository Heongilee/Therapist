package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.boardService.BoardServiceImpl;
import com.projectTeam.therapist.boardService.ReplyService;
import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReplyApiController {
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ReplyService replyService;

    // postId에 따른 답글 조회
    // TODO : 게시글에 달린 답글이 몇개인지 조회하는 것 추가(https://www.notion.so/API-f4ce3713b77e4117822d298ef2b204c4)
    @GetMapping("/replies/{postId}")
    JSONObject find(@PathVariable Long postId) {
        return replyService.findReplies(postId);
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
    @GetMapping("/replies/{replyId}/{userName}")
    void grade(@PathVariable Long replyId, @PathVariable String userName, @RequestParam int point) {
        replyService.makeGrade(replyId, userName, point);
    }
}