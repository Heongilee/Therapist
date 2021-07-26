package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.boardService.BoardServiceImpl;
import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reply")
public class ReplyController {
    @Autowired
    private ReplyRepository replyRepository;
    private BoardServiceImpl boardServiceImpl;
    @Autowired
    public ReplyController(BoardServiceImpl boardServiceImpl) {
        this.boardServiceImpl = boardServiceImpl;
    }

    // postId에 따른 답글 조회
    @GetMapping("")
    List<ReplyDto> findReplies(@RequestParam(required = false, defaultValue = "0") Long postId) {
        return replyRepository.findByPostId(postId);
    }

    // newReply 생성
    @PostMapping("/new")
    ReplyDto newReply(@RequestBody ReplyDto newReply) {
        return replyRepository.save(newReply);
    }


}
