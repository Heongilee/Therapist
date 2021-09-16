package com.projectTeam.therapist.postService;

import com.projectTeam.therapist.model.*;
import com.projectTeam.therapist.repository.PostRepository;
import com.projectTeam.therapist.repository.ReplyRepository;
import com.projectTeam.therapist.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ReplyRepository replyRepository;

    public PostDto save(String userName, PostDto postDto) {
        UserDto user = userRepository.findByUserName(userName);
        postDto.setUserDto(user);
        return postRepository.save(postDto);
    }

//    public JSONObject findByPostTypeWithPageable(PostCategory postType, final Pageable pageable) {
//        Page<PostDto> postPages = postRepository.findByPostType(postType, pageable);
//
//        // 검색된 카테고리 게시글 개수
//        JSONObject jsonObject = new JSONObject();
//        jsonObject.put("postType", postType);
//        jsonObject.put("totalAmount", postPages.getTotalElements());
//        jsonObject.put("totalPages", postPages.getTotalPages());
//
//        // postType 파라미터와 일치하는 모든 게시글들을 JSONArray로 담는다.
//        JSONArray postsArray = new JSONArray();
//        for (PostDto post : postPages.getContent()) {
//            JSONObject item = new JSONObject();
//            item.put("postId", post.getPostId());
//            item.put("userId", post.getUserDto().getUserId());
//            item.put("postType", post.getPostType().toString()); // Enum 타입이기 때문에 문자열 처리를 위한 .toString() 을 붙여준다.
//            item.put("postTitle", post.getPostTitle());
//            item.put("postContent", post.getPostContent());
////            item.put("postComments", post.getPostComments());
//            item.put("replyLength", post.getCountOfReplies());
//            postsArray.add(item);
//        }
//        jsonObject.put("posts", postsArray);
//        return jsonObject;
//    }

    public PostDto save(JSONObject requestBody) {
        if (requestBody.get("userName") == null) {
            return null;
        }

        UserDto userDto = userRepository.findByUserName((String) requestBody.get("userName"));

        PostDto newPost = new PostDto();
        newPost.setUserDto(userDto);
        newPost.setPostTitle((String) requestBody.get("postTitle"));
        newPost.setPostContent((String) requestBody.get("postContent"));

        // 열거형의 postType 경우 if-else문으로 해결한다.
        if (((String) requestBody.get("postType")).equals("JOB")) {
            newPost.setPostType(PostCategory.JOB);
        } else if (((String) requestBody.get("postType")).equals("COMPANYLIFE")) {
            newPost.setPostType(PostCategory.COMPANYLIFE);
        } else if (((String) requestBody.get("postType")).equals("FAMILY")) {
            newPost.setPostType(PostCategory.FAMILY);
        } else {
            // Nothing
        }

        return postRepository.save(newPost);
    }

    public JSONObject findSingleItem(Long postId) {
        PostDto postDto = postRepository.findById(postId).orElse(null);
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("postId", postDto.getPostId());
        jsonObject.put("postType", postDto.getPostType().toString());
        jsonObject.put("postTitle", postDto.getPostTitle());
        jsonObject.put("postContent", postDto.getPostContent());
        jsonObject.put("postCreatedAt", postDto.getPostCreatedAt());
        jsonObject.put("postUpdatedAt", postDto.getPostUpdatedAt());
        JSONArray postCommentsJsonArray = new JSONArray();
        for (PostCommentDto postComment : postDto.getPostComments()) {
            postCommentsJsonArray.add(postComment);
        }
        jsonObject.put("postComments", postCommentsJsonArray);
        JSONArray repliesJsonArray = new JSONArray();
        for (ReplyDto reply : postDto.getReplies()) {
            repliesJsonArray.add(reply);
        }
        jsonObject.put("replies", repliesJsonArray);
        jsonObject.put("countOfReplies", postDto.getReplies().size());
        JSONObject userJsonObject = new JSONObject();
        userJsonObject.put("userId", postDto.getUserDto().getUserId());
        userJsonObject.put("userName", postDto.getUserDto().getUserName());
        userJsonObject.put("userGrade", postDto.getUserDto().getUserGrade());
        jsonObject.put("userInfo", userJsonObject);

        return jsonObject;
    }

    public PostDto modifyById(PostDto newPost, Long id) {
        return postRepository.findById(id)
                .map(postDto -> {
                    postDto.setPostType(newPost.getPostType());
                    postDto.setPostTitle(newPost.getPostTitle());
                    postDto.setPostContent(newPost.getPostContent());
                    return postRepository.save(postDto);
                })
                .orElseGet(() -> {
                    newPost.setPostId(id);
                    return postRepository.save(newPost);
                });
    }

    public void deleteById(Long postId) {
        postRepository.deleteById(postId);
    }

    public JSONArray requestTopSix() {
        List<PostDto> posts = postRepository.findTop6ByOrderByPostCreatedAtDesc();

        JSONArray jsonArray = new JSONArray();
        for (PostDto post : posts) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("postId", post.getPostId());
            jsonObject.put("postType", String.valueOf(post.getPostType()));
            jsonObject.put("postTitle", post.getPostTitle());
            jsonObject.put("postContent", post.getPostContent());
            jsonObject.put("postCreatedAt", post.getPostCreatedAt());
            jsonObject.put("postUpdatedAt", post.getPostUpdatedAt());
            jsonObject.put("countOfReplies", post.getCountOfReplies());

            jsonArray.add(jsonObject);
        }
        return jsonArray;
    }

    public JSONObject findByPostType(PostCategory postType) {
        List<PostDto> posts = postRepository.findByPostTypeOrderByPostCreatedAtDesc(postType);

        // 검색된 카테고리 게시글 개수
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("postType", postType);
        jsonObject.put("totalAmount", posts.size());

        // postType 파라미터와 일치하는 모든 게시글들을 JSONArray로 담는다.
        JSONArray postsArray = new JSONArray();
        for (PostDto post : posts) {
            JSONObject item = new JSONObject();
            item.put("postId", post.getPostId());
            item.put("userId", post.getUserDto().getUserId());
            item.put("postType", post.getPostType().toString()); // Enum 타입이기 때문에 문자열 처리를 위한 .toString() 을 붙여준다.
            item.put("postTitle", post.getPostTitle());
            item.put("postContent", post.getPostContent());
//            item.put("postComments", post.getPostComments());
            item.put("replyLength", post.getCountOfReplies());
            postsArray.add(item);
        }
        jsonObject.put("posts", postsArray);
        return jsonObject;
    }
}
