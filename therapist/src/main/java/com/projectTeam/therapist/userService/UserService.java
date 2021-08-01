package com.projectTeam.therapist.userService;

import com.projectTeam.therapist.model.RoleDto;
import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// @Service 어노테이션을 통해 비즈니스 로직을 작성할 수 있게 된다.
// 또한, 이렇게 서비스 클래스로 따로 빼면 단위 테스트를 수행할때에도 용이하다.
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto save(UserDto user) {
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(user.getUserPassword());
        user.setUserPassword(encodedPassword);
        user.setUserEnabled(true);
        RoleDto roleDto = new RoleDto();
        roleDto.setRoleId(1L);
        user.getRoles().add(roleDto);

        return userRepository.save(user);
    }
}
