package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.*;
import com.projectTeam.therapist.repository.NoticeRepository;
import com.projectTeam.therapist.repository.PostRepository;
import com.projectTeam.therapist.repository.ReplyRepository;
import com.projectTeam.therapist.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReplyService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private NoticeRepository noticeRepository;

    public JSONObject writeReply(JSONObject requestBody, Long postId) {
        if (requestBody.get("userName") == null) {
            return null;
        }

        UserDto userDto = userRepository.findByUserName((String) requestBody.get("userName"));
        PostDto postDto = postRepository.getById(postId);

        // save notice of receiver
        NoticeDto noticeDto = NoticeDto.builder()
                .is_check(false)
                .post_id(postId)
                .type("reply")
                .username(postDto.getUserDto().getUserName())
                .build();
        noticeRepository.save(noticeDto);

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

    public JSONObject findReplies(Long postId, Pageable pageable) {
        PostDto post = postRepository.findById(postId).orElse(null);
        Page<ReplyDto> replies = replyRepository.findByPostDto(post, pageable);
        JSONObject jsonObject = new JSONObject();

        JSONArray replyArray = new JSONArray();
        for (ReplyDto reply : replies) {
            JSONObject item = new JSONObject();
            item.put("replyId", reply.getReplyId());
            item.put("replyContent", reply.getReplyContent());
            item.put("postId", reply.getPostDto().getPostId());

            JSONObject userInfo = new JSONObject();
            userInfo.put("userId", reply.getUserDto().getUserId());
            userInfo.put("userName", reply.getUserDto().getUserName());
            userInfo.put("userGrade", reply.getUserDto().getUserGrade());
            item.put("userInfo", userInfo);

            item.put("replyStar", reply.getStar());
            item.put("replyCommentSize", reply.getReplyComments().size());
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
    public void makeGrade(Long replyId, int starPoint) {
        ReplyDto reply = replyRepository.getById(replyId);
        UserDto user = reply.getUserDto();
        int star = user.getUserStars();
        String grade = user.getUserGrade();
        if (star < 50) {
            grade = "BRONZE";
        } else if (star >= 50 && star < 100) {
            grade = "SILVER";
        } else {
            grade = "GOLD";
        }
        user.setUserGrade(grade);
        user.setUserStars(star+starPoint);
        userRepository.save(user);

        replyRepository.findById(replyId)
                .map(replyDto -> {
                    replyDto.setStar(starPoint);
                    return replyRepository.save(replyDto);
                });
    }
}
