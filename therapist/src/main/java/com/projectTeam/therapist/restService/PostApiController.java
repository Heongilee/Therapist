package com.projectTeam.therapist.restService;

import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.util.StringUtils;

import java.util.List;

@RestController
@RequestMapping("/api")
class PostApiController {
    @Autowired
    private PostRepository postRepository;

    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/posts")
    List<PostDto> all(@RequestParam(required = false, defaultValue="") String postTitle, @RequestParam(required = false, defaultValue="") String postContent) {
        if (StringUtils.isEmpty(postTitle) && StringUtils.isEmpty(postContent)) {
            return postRepository.findAll();
        } else {
            return postRepository.findByPostTitleOrPostContent(postTitle, postContent);
        }
    }
    // end::get-aggregate-root[]

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