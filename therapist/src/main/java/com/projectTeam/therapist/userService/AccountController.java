package com.projectTeam.therapist.userService;

import com.projectTeam.therapist.model.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
@RestController
@RequestMapping("/api/account")
public class AccountController {
    @Autowired
    private UserService userService;

    @PutMapping("/register")
    public void replacePost(@RequestBody UserDto newUser) {
        userService.modifyUserPassword(newUser);
    }

}