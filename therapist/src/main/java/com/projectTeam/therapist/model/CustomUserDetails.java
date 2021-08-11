package com.projectTeam.therapist.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

/*
스프링 시큐리티가 로그인 요청을 가로채서 로그인을 진행하고 완료가 되면 UserDetails타입의 오브젝트를
스프링 시큐리티의 고유한 세션 저장소에 저장해둔다.
*/
@Data
public class CustomUserDetails implements UserDetails {
    private UserDto userDto;    //Composition

    public CustomUserDetails(UserDto userDto) {
        this.userDto = userDto;
    }

    public UserDto getUserDto() {
        return this.userDto;
    }

    // 계정이 가지고 있는 권한 목록을 리턴한다.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO : 고정값으로 때려넣은거 수정하기.
        Collection<GrantedAuthority> auth = new ArrayList<>();
        auth.add(() -> {return "ROLE_USER";});
        return auth;
    }

    @Override
    public String getPassword() {
        return userDto.getUserPassword();
    }

    @Override
    public String getUsername() {
        return userDto.getUserName();
    }

    // 계정이 만료되지 않았는지 리턴한다. (true : 만료안됨.)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정이 잠겨있는지 리턴한다. (true : 안 잠겨있음.)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 비밀번호가 만료되지 않았는지 리턴한다. (true: 만료 안됨.)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정 활성화(사용가능)인 지 리턴한다. (true: 활성화)
    @Override
    public boolean isEnabled() {
        return userDto.getUserEnabled();
    }
}