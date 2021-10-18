package com.projectTeam.therapist.postService;

import com.projectTeam.therapist.model.*;
import com.projectTeam.therapist.repository.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    private PostCommentRepository postCommentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ReplyCommentRepository replyCommentRepository;
    @Autowired
    private NoticeRepository noticeRepository;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PostComment에 관한 비즈니스 로직
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Called from CommentApiController (GET /api/postComments )
    public List<PostCommentDto> findAllPostComments() {
        return postCommentRepository.findAll();
    }

    // Called from CommentApiController (GET /api/postComments )
    public PostCommentDto findSinglePostComment(Long postCommentId) {
        return postCommentRepository.findById(postCommentId).orElse(null);
    }

    // Called from CommentApiController (POST /api/postComments )
    public PostCommentDto newPostComment(JSONObject params, String userName, Long postId) {
        String postCommentContent = (params == null) ? "" : (String) params.get("postCommentContent");
        UserDto foundUserDto = userRepository.findByUserName(userName);
        PostDto foundPostDto = postRepository.findById(postId).orElse(null);

        // save notice of receiver
        NoticeDto noticeDto = NoticeDto.builder()
                .is_check(false)
                .post_id(postId)
                .type("postComment")
                .username(foundPostDto.getUserDto().getUserName())
                .senderUser(foundUserDto.getUserName())
                .build();
        noticeRepository.save(noticeDto);

        // build DTO object.
        PostCommentDto newPostComment = new PostCommentDto();
        newPostComment.setPostCommentContent(postCommentContent);
        newPostComment.setUserDto(foundUserDto);
        newPostComment.setPostDto(foundPostDto);

        return postCommentRepository.save(newPostComment);
    }

    // Called from CommentApiController (DELETE /api/postComments )
    public void deletePostComment(Long postCommentId) {
        postCommentRepository.deleteById(postCommentId);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ReplyComment에 관한 비즈니스 로직
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // create Reply Comment
    // Called from CommentApiController (POST /api/replyComments )
    public ReplyCommentDto newReplyComment(JSONObject params, String userName, Long replyId) {
        String replyCommentContent = (params == null) ? "" : (String) params.get("replyCommentContent");
        UserDto foundUserDto = userRepository.findByUserName(userName);
        ReplyDto foundReplyDto = replyRepository.findById(replyId).orElse(null);

        // save notice of receiver
        NoticeDto noticeDto = NoticeDto.builder()
                .is_check(false)
                .post_id(foundReplyDto.getPostDto().getPostId())
                .type("replyComment")
                .username(foundReplyDto.getUserDto().getUserName())
                .senderUser(foundUserDto.getUserName())
                .build();
        noticeRepository.save(noticeDto);

        ReplyCommentDto newReplyComment = new ReplyCommentDto();
        newReplyComment.setReplyCommentContent(replyCommentContent);
        newReplyComment.setUserDto(foundUserDto);
        newReplyComment.setReplyDto(foundReplyDto);

        return replyCommentRepository.save(newReplyComment);
    }

    // read Reply Comment find by replyId
    public JSONObject findReplyComments(Long replyId, Pageable pageable) {
        ReplyDto replyDto = replyRepository.findById(replyId).orElse(null);
        Page<ReplyCommentDto> replyComments = replyCommentRepository.findByReplyDtoOrderByCommentCreatedAtDesc(replyDto, pageable);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("replyCommentSize", replyComments.getTotalElements());

        JSONArray jsonArray = new JSONArray();
        for (ReplyCommentDto replyComment : replyComments) {
            JSONObject item = new JSONObject();
            item.put("replyCommentId", replyComment.getReplyCommentId());
            item.put("replyCommentContent", replyComment.getReplyCommentContent());
            item.put("commentCreatedAt", replyComment.getCommentCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
            item.put("commentUpdatedAt", replyComment.getCommentUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
            item.put("userId", replyComment.getUserDto().getUserId());
            item.put("userName", replyComment.getUserDto().getUserName());
            jsonArray.add(item);
        }
        jsonObject.put("replyComments", jsonArray);
        return jsonObject;
    }

    // delete Reply Comment
    public void deleteReplyComment(Long replyCommentId) {
        replyCommentRepository.deleteById(replyCommentId);
    }

    public JSONObject findAllPostCommentsByPostId(Long postId, Pageable pageable) {
        PostDto postDto = postRepository.findById(postId).orElse(null);
        Page<PostCommentDto> postComments = postCommentRepository.findByPostDtoOrderByCommentCreatedAtDesc(postDto, pageable);
        JSONObject jsonObject = new JSONObject();
        JSONArray jsonArray = new JSONArray();
        for (PostCommentDto postComment : postComments) {
            JSONObject item = new JSONObject();
            item.put("postCommentId", postComment.getPostCommentId());
            item.put("postCommentContent", postComment.getPostCommentContent());
            item.put("commentCreatedAt", postComment.getCommentCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
            item.put("commentUpdatedAt", postComment.getCommentUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
            item.put("userId", postComment.getUserDto().getUserId());
            item.put("userName", postComment.getUserDto().getUserName());
            jsonArray.add(item);
        }
        jsonObject.put("postComments", jsonArray);
        return jsonObject;
    }
}
