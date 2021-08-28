package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.PostCategory;
import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.postService.PostService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

// `@RestController`어노테이션을 사용하는 경우, 요청과 응답의 객체변환 및 직렬화/역직렬화를 자동으로 이 jackson 라이브러리가 담당하게 된다.
@RestController
@CrossOrigin("*")
@RequestMapping("/api")
class PostApiController {
    @Autowired
    private PostService postService;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 메인 페이지 관련 API
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @GetMapping("/main/posts")
    JSONArray requestTopSix() {
        return postService.requestTopSix();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // 게시글 관련 API
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    @GetMapping("/posts")
//    JSONObject requestGetPageable(@RequestParam(required = false, defaultValue="JOB") PostCategory postType, final Pageable pageable){
//        return postService.findByPostTypeWithPageable(postType, pageable);
//    }

    @GetMapping("/posts")
    JSONObject requestGet(@RequestParam(required = false, defaultValue="JOB") PostCategory postType){
        return postService.findByPostType(postType);
    }

    @PostMapping("/posts")
    PostDto newPost(@RequestBody JSONObject requestBody) {
        return postService.save(requestBody);
    }

    // Single item
    @GetMapping("/posts/{postId}")
    PostDto one(@PathVariable Long postId) {
        return postService.findSingleItem(postId);
    }

    @PutMapping("/posts/{id}")
    PostDto replacePost(@RequestBody PostDto newPost, @PathVariable Long id) {
        return postService.modifyById(newPost, id);

    }

    @DeleteMapping("/posts/{postId}")
    void deletePost(@PathVariable Long postId) {
        postService.deleteById(postId);
    }
}