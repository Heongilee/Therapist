package com.projectTeam.therapist.boardService;


import com.projectTeam.therapist.model.CommentDto;
import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.repository.CommentRepository;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {
    private final ReplyRepository replyRepository;
    private final CommentRepository commentRepository;

    public BoardServiceImpl(ReplyRepository replyRepository,CommentRepository commentRepository) {
        this.replyRepository = replyRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public void writeComment(CommentDto comment) {
        commentRepository.save(comment);
    }

    @Override
    public void writeReply(ReplyDto reply) {
        replyRepository.save(reply);
    }

}
