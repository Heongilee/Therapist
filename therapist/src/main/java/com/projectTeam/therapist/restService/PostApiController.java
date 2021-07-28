package com.projectTeam.therapist.restService;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.projectTeam.therapist.model.PostCategory;
import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.repository.PostRepository;
import com.projectTeam.therapist.repository.ReplyRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// `@RestController`어노테이션을 사용하는 경우, 요청과 응답의 객체변환 및 직렬화/역직렬화를 자동으로 이 jackson 라이브러리가 담당하게 된다.
@RestController
@RequestMapping("/api")
class PostApiController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ReplyRepository replyRepository;

    // 카테고리(postType)와 일치하는 모든 게시글을 조회하는 요청
//    class RequestGetDto {
//        private int postLength;
//        private List<PostDto> posts;
//
//        public RequestGetDto(int postLength, List<PostDto> posts) {
//            this.postLength = postLength;
//            this.posts = posts;
//        }
//    }
    @GetMapping("/posts")
    JSONObject requestGet(@RequestParam(required = false, defaultValue="JOB") PostCategory postType){
        List<PostDto> posts = postRepository.findByPostType(postType);

        // 검색된 카테고리 게시글 개수
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("postLength", posts.size());

        // postType 파라미터와 일치하는 모든 게시글들을 JSONArray로 담는다.
        JSONArray postsArray = new JSONArray();
        for (PostDto post : posts) {
            JSONObject item = new JSONObject();
            item.put("postId", post.getPostId());
            item.put("memberId", post.getMemberId());
            item.put("postType", post.getPostType().toString()); // Enum 타입이기 때문에 문자열 처리를 위한 .toString() 을 붙여준다.
            item.put("postTitle", post.getPostTitle());
            item.put("postContent", post.getPostContent());

            item.put("replyLength", replyRepository.countByPostId(post.getPostId()));
            postsArray.add(item);
        }
        jsonObject.put("posts", postsArray);
        return jsonObject;
    }

    @PostMapping("/posts")
    PostDto newPost(@RequestBody PostDto newPost) {
        return postRepository.save(newPost);
    }

    // Single item
    @GetMapping("/posts/{postId}")
    PostDto one(@PathVariable Long postId) {
        return postRepository.findById(postId).orElse(null);
    }

    @PutMapping("/posts/{id}")
    PostDto replacePost(@RequestBody PostDto newPost, @PathVariable Long id) {

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

    @DeleteMapping("/posts/{id}")
    void deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
    }
}