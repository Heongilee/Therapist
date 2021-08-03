package com.projectTeam.therapist.userService;

import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login() {
        return "account/login";
    }

    @GetMapping("/register")
    public String register(@RequestParam(required = false) String status) {
        return "account/register";
    }

    @PostMapping("/register")
    public String register(UserDto user) {
        UserDto response = userService.save(user);

        if (response == null) {
            return "redirect:/account/register?isAlreadySignUp";
        } else {
            return "redirect:/account/signup_info?signUpSuccess";
        }
    }

    @PutMapping("/register")
    public void replacePost(@RequestBody UserDto newUser) {
        userService.modifyUserPassword(newUser);
    }

    @GetMapping("/signup_info")
    public String signUpInfo(Model model) {
        return "account/signup_info";
    }
}