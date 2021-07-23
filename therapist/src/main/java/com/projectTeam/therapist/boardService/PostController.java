package com.projectTeam.therapist.boardService;

import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    public String form(Model model, @RequestParam(required = false) Long id) {
        if (id == null) {
            model.addAttribute("post", new PostDto());
        } else {
            PostDto postDto = postRepository.findById(id).orElse(null);
            model.addAttribute("post", postDto);
        }
        return "post/form";
    }
    @PostMapping("/form")
    public String formSubmit(@ModelAttribute PostDto postDto, Model model) {
        postRepository.save(postDto);
        return "redirect:/post/list";
    }
}
