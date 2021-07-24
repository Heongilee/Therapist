package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.CommentDto;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/comment")
public class CommentController {
    @Autowired
    private ReplyRepository replyRepository;
    private BoardServiceImpl boardServiceImpl;

    @RequestMapping("/new")
    public String createComment() {
        CommentDto commentDto = new CommentDto();
        commentDto.setMemberId(1L);
        commentDto.setCommentContent("Test_Comment 1");

        boardServiceImpl.writeComment(commentDto);
        return "redirect:/post/list"; // TODO : 나중에 redirect 수정
    }


}
