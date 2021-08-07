package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.PostCategory;
import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.postService.PostService;
import com.projectTeam.therapist.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/post")
public class PostController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private PostService postService;

    @GetMapping("/list")
    public String list(Model model) {
        List<PostDto> posts = postRepository.findAll();
        model.addAttribute("posts", posts);
        return "post/list";
    }

    @GetMapping("/form")
    public String form(Model model, @RequestParam(required = false) Long postId) {
        if (postId == null) {
            model.addAttribute("post", new PostDto());
        } else {
            PostDto postDto = postRepository.findById(postId).orElse(null);
            model.addAttribute("post", postDto);
        }
        return "post/form";
    }

    // 방법 1. Spring Security에서 제공하는 Authentication을 파라미터로 명시하면 인증정보에 대한 것들이 알아서 넘어오게 된다.
    // 방법 2. SecurityContextHolder를 이용해서 Authentication(인증)에 대한 정보를 가져온 뒤에 userName을 얻는다.
    //     ※ 이렇게 하는 이유는 사용자가 악의적으로 개발자 환경을 이용해서 중간에서 값을 조작하는 경우를 방지할 수 있기 때문임.
    @PostMapping("/form")
    public String formSubmit(@ModelAttribute("post") @Valid PostDto post, BindingResult bindingResult) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (bindingResult.hasErrors()) {
            return "post/form";
        }
        String userName = authentication.getName();
        postService.save(userName, post);
        // postRepository.save(post);
        return "redirect:/post/list";
    }
}
