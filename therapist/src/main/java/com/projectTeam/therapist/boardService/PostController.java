package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    @PostMapping("/form")
    public String formSubmit(@ModelAttribute("post") @Valid PostDto post, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "post/form";
        }
        postRepository.save(post);
        return "redirect:/post/list";
    }
}
