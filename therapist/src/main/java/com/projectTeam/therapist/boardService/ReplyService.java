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

@Service
public class ReplyService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReplyRepository replyRepository;

    public JSONObject writeReply(JSONObject requestBody, Long postId) {
        if (requestBody.get("userName") == null) {
            return null;
        }

        UserDto userDto = userRepository.findByUserName((String) requestBody.get("userName"));
        PostDto postDto = postRepository.getById(postId);

        ReplyDto newReply = new ReplyDto();
        newReply.setUserDto(userDto);
        newReply.setPostDto(postDto);
        newReply.setReplyContent((String) requestBody.get("replyContent"));
        replyRepository.save(newReply);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("star", newReply.getStar());
        jsonObject.put("replyId", newReply.getReplyId());
        jsonObject.put("replyContent", newReply.getReplyContent());
        jsonObject.put("postId", newReply.getPostDto().getPostId());
        jsonObject.put("userName", newReply.getUserDto().getUserName());
        jsonObject.put("userId", newReply.getUserDto().getUserId());

        return jsonObject;
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
            item.put("replyStar", reply.getStar());
            replyArray.add(item);
        }
        jsonObject.put("replies", replyArray);
        return jsonObject;
    }

    public JSONObject modifyReply(JSONObject modifiedReply, Long replyId) {
        JSONObject jsonObject = new JSONObject();

        replyRepository.findById(replyId)
            .map(replyDto -> {
                replyDto.setReplyContent((String) modifiedReply.get("replyContent"));
                jsonObject.put("star", replyDto.getStar());
                jsonObject.put("replyId", replyDto.getReplyId());
                jsonObject.put("replyContent", replyDto.getReplyContent());
                jsonObject.put("postId", replyDto.getPostDto().getPostId());
                jsonObject.put("userName", replyDto.getUserDto().getUserName());
                jsonObject.put("userId", replyDto.getUserDto().getUserId());
                return replyRepository.save(replyDto);
            });

        return jsonObject;

    }

    public void deleteReply(Long replyId) {
        replyRepository.deleteById(replyId);
    }

    // make grade with star point
    // TODO : (Note) uses unchecked or unsafe operations.
    public void makeGrade(Long replyId, String userName, int starPoint) {
        UserDto user = userRepository.findByUserName(userName);
        int star = user.getUserStars();
        String grade = user.getUserGrade();
        if (star < 50) {
            grade = "BRONZE";
        } else if (star >= 50 && star < 100) {
            grade = "SILVER";
        } else {
            grade = "GOLD";
        }
        userRepository.findByUserName(userName)
                .setUserGrade(grade);
        userRepository.findByUserName(userName)
                .setUserStars(star+starPoint);

        replyRepository.findById(replyId)
                .map(replyDto -> {
                    replyDto.setStar(starPoint);
                    return replyRepository.save(replyDto);
                });
    }
}
