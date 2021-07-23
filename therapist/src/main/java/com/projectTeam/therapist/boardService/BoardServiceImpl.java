package com.projectTeam.therapist.boardService;


@Service
public class BoardServiceImpl implements BoardService {

    private final ReplyRepository replyRepository;
    public BoardServiceImpl(ReplyRepository replyRepository) {
        this.replyRepository = replyRepository;
    }


    @Override
    public void listAllPost() {

    }

    @Override
    public void modifyPost(Long postId) {

    }

    @Override
    public void removePost(Long postId) {

    }

    @Override
    public void modifyComment(Long commentId) {

    }

    @Override
    public void removeComment(Long commentId) {

    }

    @Override
    public void writeReply(ReplyDto reply) {
        replyRepository.save(reply);
    }

}
