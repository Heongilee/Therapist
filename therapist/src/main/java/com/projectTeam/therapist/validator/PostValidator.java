package com.projectTeam.therapist.validator;

import com.projectTeam.therapist.model.PostDto;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.thymeleaf.util.StringUtils;

@Component
public class PostValidator implements Validator {
    @Override
    public boolean supports(Class<?> clazz) {
        // 어떤 클래스(PostDto)를 검증(Validation)할 것인지 체크하는 메서드
        return PostDto.class.equals(clazz);
    }

    @Override
    public void validate(Object obj, Errors errors) {
        // 실제로 이 클래스(PostDto)로 들어온 값이 유효한지 체크하는 메서드
        PostDto p = (PostDto) obj;
        if (StringUtils.isEmpty(p.getPostContent())) {
            errors.rejectValue("postContent", "key", "내용을 입력하세요.");
        }
    }
}
