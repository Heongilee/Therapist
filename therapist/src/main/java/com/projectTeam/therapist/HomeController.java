package com.projectTeam.therapist;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    // name이라는 쿼리 스트링을 주었을때 받을 파라미터 명이 String 타입의 name이고,
    // 값이 주어지지 않을 경우 defaultValue로 "World"를 파라미터 name에 대입한다.
    @GetMapping
    public String greeting(@RequestParam(name="name", required=false, defaultValue="Therapist") String name, Model model) {
        model.addAttribute("name", name);
        return "index";
    }
}