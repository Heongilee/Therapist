package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.ReplyDto;
import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.PostRepository;
import com.projectTeam.therapist.repository.ReplyRepository;
import com.projectTeam.therapist.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserDefinedFileAttributeView;
import java.util.List;

@Service
public class ReplyService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReplyRepository replyRepository;

    public ReplyDto writeReply(JSONObject requestBody) {
        if (requestBody.get("userName") == null) {
            return null;
        }

        UserDto userDto = userRepository.findByUserName((String) requestBody.get("userName"));

        ReplyDto newReply = new ReplyDto();
        newReply.setUserDto(userDto);
        newReply.setReplyContent((String) requestBody.get("replyContent"));

        return replyRepository.save(newReply);
    }

    public JSONObject findReplies(Long postId) {
        PostDto post = postRepository.getById(postId);

        JSONObject jsonObject = new JSONObject();

        JSONArray replyArray = new JSONArray();
        for (ReplyDto reply : post.getReplies()) {
            JSONObject item = new JSONObject();
            item.put("replyId", reply.getReplyId());
            item.put("replyContent", reply.getReplyContent());
            item.put("star", reply.getStar());
            item.put("postId", reply.getPostDto().getPostId());
            item.put("userId", reply.getUserDto().getUserId());
            replyArray.add(item);
        }
        jsonObject.put("replies", replyArray);
        return jsonObject;
    }

    public ReplyDto modifyReply(ReplyDto newReply, Long replyId) {
        return replyRepository.findById(replyId)
                .map(replyDto -> {
                    replyDto.setReplyContent(newReply.getReplyContent());
                    return replyRepository.save(replyDto);
                })
                .orElseGet(() -> {
                    newReply.setReplyId(replyId);
                    return replyRepository.save(newReply);
                });
    }

    public void deleteReply(Long replyId) {
        replyRepository.deleteById(replyId);
    }

}
