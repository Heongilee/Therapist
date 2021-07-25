package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/reply")
public class ReplyController {
    @Autowired
    private ReplyRepository replyRepository;
    private BoardServiceImpl boardServiceImpl;
    @Autowired
    public ReplyController(BoardServiceImpl boardServiceImpl) {
        this.boardServiceImpl = boardServiceImpl;
    }

    @GetMapping("{postId}/new")
    public String createReplyForm() {
        return "reply/createReplyForm";
    }

    @RequestMapping("/new")
    public String createReply(ReplyForm replyForm) {
        ReplyDto replyDto = new ReplyDto();
        replyDto.setReplyContent(replyForm.getReplyContent());
        replyDto.setStar(0);
        replyDto.setPostId(1L);

        boardServiceImpl.writeReply(replyDto);
        return "redirect:/post/list";
    }

    @RequestMapping(value = "{postId}")
    public String replyPost(@PathVariable("postId") Long postId, Model model) {
        List<ReplyDto> replies = replyRepository.findByPostId(postId);
        model.addAttribute("replies", replies);
        return "post/postPage";
    }

    //test
}
