package com.projectTeam.therapist.userService;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projectTeam.therapist.model.*;
import com.projectTeam.therapist.repository.*;
import com.projectTeam.therapist.util.SecurityUtil;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.*;

// @Service 어노테이션을 통해 비즈니스 로직을 작성할 수 있게 된다.
// 또한, 이렇게 서비스 클래스로 따로 빼면 단위 테스트를 수행할때에도 용이하다.
@Service
public class UserService {
    @Autowired
    private PostCommentRepository postCommentRepository;
    @Autowired
    private ReplyCommentRepository replyCommentRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder; // /configuration/WebSecurityConfig에서 Bean객체로 등록함.

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    private final String clientId = "bee5cefdb5d9d94c0b32f71cf0de38e7";
    private final String clientSecret = "LcnyKGSgPVuOolspq5ococnDLfrlDqXM";
    private final String redirectUri = "http://localhost:8080/auth/kakao/callback";

    public UserDto save(UserDto userDto) {
        if (userRepository.findOneWithAuthoritiesByUserName(userDto.getUserName()).orElse(null) != null) {
            throw new RuntimeException("already exist user");
        }

        RoleDto role = RoleDto.builder()
                .roleId(1L)
                .build();

        UserDto user = UserDto.builder()
                .userName(userDto.getUserName())
                .userPassword(passwordEncoder.encode(userDto.getUserPassword()))
                .userEnabled(true)
                .roles(Collections.singleton(role))
                .build();
        return userRepository.save(user);
    }

    // getUserWithAuthorities 메소드는 username을 파라미터로 받아 해당 유저의 정보 및 권한 정보를 리턴
    // getMyUserWithAuthorities 메소드는 위에서 만든 SecurityUtil의 getCurrentUsername() 메소드가 리턴하는 username의 유저 및 권한 정보를 리턴
    @Transactional(readOnly = true)
    public Optional<UserDto> getUserWithRoles(String username) {
        return userRepository.findOneWithAuthoritiesByUserName(username);
    }

    @Transactional(readOnly = true)
    public Optional<UserDto> getMyUserWithRoles() {
        return SecurityUtil.getCurrentUsername().flatMap(userRepository::findOneWithAuthoritiesByUserName);
    }

    //  authorizationCode 값으로 카카오 서버에서 access_token값을 받음.
    public String getAccessToken(String code) {
        // POST방식으로 Key=Value 데이터를 요청(카카오에게)
        // 과거 Java에서 사용한 방식 : HttpsURLConnection, Retrofit2 (안드로이드에서 많이 씀), OkHttp
        RestTemplate rt = new RestTemplate();

        // HttpHeader 오브젝트 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody를 하나의 오브젝트에 담기
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", clientSecret);

        // Http 요청하기 - POST 방식 - 그리고 response 변수에 응답 받음.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON to Object 라이브러리
        // Gson, Json Simple, ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();
        OAuthTokenDto oAuthTokenDto = null;
        try {
            oAuthTokenDto = objectMapper.readValue(response.getBody(), OAuthTokenDto.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        System.out.println("카카오 엑세스 토큰 = " + oAuthTokenDto.getAccess_token());

        return oAuthTokenDto.getAccess_token();
    }

    public Map<String, String> requestKakaoUserInfo(String accessToken) {
        RestTemplate rt2 = new RestTemplate();

        // HttpHeader 오브젝트 생성
        HttpHeaders headers2 = new HttpHeaders();
        headers2.add("Authorization", "Bearer " + accessToken);
        headers2.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http 요청하기 - POST 방식 - 그리고 response 변수에 응답 받음.
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers2);
        ResponseEntity<String> response2 = rt2.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper2 = new ObjectMapper();
        KakaoProfileDto kakaoProfileDto = null;
        try {
            kakaoProfileDto = objectMapper2.readValue(response2.getBody(), KakaoProfileDto.class);
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        KakaoProfileDto finalKakaoProfileDto = kakaoProfileDto;
        return new HashMap<>(){{
            put("username", finalKakaoProfileDto.getKakao_account().getEmail());        // 카카오로 로그인 하는 사용자는 카카오 이메일이 곧 아이디가 되어 우리 DB에 저장됨
            put("password", String.valueOf(UUID.randomUUID()));
            put("profile_image", finalKakaoProfileDto.getProperties().getProfile_image());
            put("thumbnail_image", finalKakaoProfileDto.getProperties().getThumbnail_image());
        }};
    }

    public boolean isAlreadySignUp(String username) {
        return (userRepository.countByUserName(username) >= 1) ? true : false;
    }

    public UserDto findKakaoUser(String username) {
        return userRepository.findByUserName(username);
    }

    // 기존 /account/login으로 보내던 걸 /auth/authenticate로 보내 토큰 요청
    public String requestPostWithFormData(String contextPath, LoginDto loginDto) {  // contextPath: "/auth/authenticate"
        JSONObject input = new JSONObject();
        input.put("username", loginDto.getUsername());
        input.put("password", loginDto.getPassword());

        String url = "http://localhost:8080" + contextPath;
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity param= new HttpEntity(input, headers);

        RestTemplate restTemplate = new RestTemplate();
        String result = restTemplate.postForObject(url, param, String.class);
        return result;
    }

    public UserDto modifyUserPassword(UserDto newUser) {
        UserDto foundUser = userRepository.findByUserName(newUser.getUserName());

        if (foundUser == null) {
            // 기존에 없는 경우 새로 객체를 만들어서 저장하기.
            // 비밀번호 암호화
            newUser.setUserPassword(passwordEncoder.encode(newUser.getUserPassword()));

            // 기본 활성화 상태
            RoleDto role = RoleDto.builder()
                    .roleId(1L)                 // 기본 권한 1번 == ROLE_USER
                    .build();
            newUser.setRoles(Collections.singleton(role));
            return userRepository.save(newUser);
        } else {
            foundUser.setUserPassword(passwordEncoder.encode(newUser.getUserPassword()));
            foundUser.setUserProfileImage(newUser.getUserProfileImage());
            foundUser.setUserThumbnailImage(newUser.getUserThumbnailImage());

            return userRepository.save(foundUser);
        }
    }

    public JSONObject searchMyData(String userName, String menuType, Pageable pageable) {
        // contextPath로 입력받은 userName을 가지고 UserDto객체를 얻은 다음에...
        UserDto userDto = userRepository.findByUserName(userName);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("userId", userDto.getUserId());
        jsonObject.put("userName", userDto.getUserName());

        if (menuType.equals("myPosts")) {
            // 위에서 얻어낸 UserDto를 가지고 내가 작성한 게시글을 조회한다.
            Page<PostDto> posts = postRepository.findByUserDto(userDto, pageable);

            jsonObject.put("totalAmount", posts.getTotalElements());
            jsonObject.put("totalPages", posts.getTotalPages());
            JSONArray userPosts = new JSONArray();
            for (PostDto post : posts.getContent()) {
                JSONObject item = new JSONObject();
                item.put("postId", post.getPostId());
                item.put("postType", post.getPostType());
                item.put("postTitle", post.getPostTitle());
                item.put("postContent", post.getPostContent());
                userPosts.add(item);
            }
            jsonObject.put("userPosts", userPosts);
        } else if (menuType.equals("myReplies")) {
            // 내가 쓴 답글
            Page<ReplyDto> replies = replyRepository.findByUserDto(userDto, pageable);

            jsonObject.put("totalAmount", replies.getTotalElements());
            jsonObject.put("totalPages", replies.getTotalPages());
            JSONArray userReplies = new JSONArray();
            for (ReplyDto reply : replies.getContent()) {
                JSONObject item = new JSONObject();
                item.put("replyId", reply.getReplyId());
                item.put("postTitle", reply.getPostDto().getPostTitle() + "에 대한 답글");
                item.put("replyContent", reply.getReplyContent());
                userReplies.add(item);
            }
            jsonObject.put("userReplies", userReplies);
        } else if (menuType.equals("myPostComments")) {
            // 내가 쓴 post 댓글
            Page<PostCommentDto> postComments = postCommentRepository.findByUserDto(userDto, pageable);
            JSONArray cmtArray = new JSONArray();

            jsonObject.put("totalAmount", postComments.getTotalElements());
            jsonObject.put("totalPages", postComments.getTotalPages());
            for (PostCommentDto cmt : postComments.getContent()) {
                JSONObject cmtObject = new JSONObject();

                cmtObject.put("id", cmt.getPostDto().getPostId());
                cmtObject.put("commentId", cmt.getPostCommentId());
                cmtObject.put("content", cmt.getPostCommentContent());
                cmtArray.add(cmtObject);
            }
            jsonObject.put("userPostComments", cmtArray);

        } else if (menuType.equals("myReplyComments")){
            // 내가 쓴 reply 댓글
            Page<ReplyCommentDto> replyComments = replyCommentRepository.findByUserDto(userDto, pageable);
            JSONArray cmtArray = new JSONArray();

            jsonObject.put("totalAmount", replyComments.getTotalElements());
            jsonObject.put("totalPages", replyComments.getTotalPages());
            for (ReplyCommentDto cmt : replyComments.getContent()) {
                JSONObject cmtObject = new JSONObject();
                cmtObject.put("id", cmt.getReplyDto().getReplyId());
                cmtObject.put("commentId", cmt.getReplyCommentId());
                cmtObject.put("content", cmt.getReplyCommentContent());
                cmtArray.add(cmtObject);
            }
            jsonObject.put("userReplyComments", cmtArray);
        } else {
            // 예외 처리 ???

        }

        return jsonObject;
    }

    // Called from UserApiController (GET /api/users )
    public List<UserDto> allUsers() {
        return userRepository.findAll();
    }

    // Called from UserApiController (GET /api/users/{userName} )
    public UserDto findUser(String userName) {
        return userRepository.findByUserName(userName);
    }

    // Called from UserApiController (POST /api/users )
    public UserDto newUser(UserDto userDto) {
        return userRepository.save(userDto);
    }

    // Called from UserApiController (POST /api/users )
    public UserDto replaceUser(UserDto newUser, Long userId) {
        return userRepository.findById(userId)
            .map(userDto -> {
                userDto.getPosts().clear();                             // 기존의 데이터는 전부 삭제하고 ...
                userDto.getPosts().addAll(newUser.getPosts());          // 새로운 데이터로 전부 교체한다.
                for (PostDto post : userDto.getPosts()) {
                    post.setUserDto(userDto);
                }
                return userRepository.save(userDto);
            })
            .orElseGet(() -> {
                newUser.setUserId(userId);
                return userRepository.save(newUser);
            });
    }

    // Called from UserApiController (DELETE /api/users/{userId} )
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    // Called from UserApiController (POST /api/users/mypage )
    public void deleteMyPosts(Map<Long, Long> posts) {
        System.out.println(posts);
        for (Long postId : posts.values()) {
            postRepository.deleteById(postId);
        }
    }
}
