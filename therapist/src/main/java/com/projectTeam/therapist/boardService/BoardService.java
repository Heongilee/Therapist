package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.CommentDto;
import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.ReplyDto;
import org.springframework.stereotype.Service;


public interface BoardService {
    public void writeComment(CommentDto comment);
    public void writeReply(ReplyDto reply);
}
