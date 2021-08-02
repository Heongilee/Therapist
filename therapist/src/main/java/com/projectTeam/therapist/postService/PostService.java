package com.projectTeam.therapist.postService;

import com.projectTeam.therapist.model.PostDto;
import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.PostRepository;
import com.projectTeam.therapist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public PostDto save(String userName, PostDto postDto) {
        UserDto user = userRepository.findByUserName(userName);
        postDto.setUserDto(user);
        return postRepository.save(postDto);
    }
}
