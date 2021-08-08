package com.projectTeam.therapist.boardService;


import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.springframework.stereotype.Service;

@Service
public class BoardServiceImpl implements BoardService {
    private final ReplyRepository replyRepository;

    public BoardServiceImpl(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }

    @Override
    public void writeReply(ReplyDto reply) {
        replyRepository.save(reply);
    }

}
