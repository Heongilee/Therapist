package com.projectTeam.therapist.postService;

import com.projectTeam.therapist.model.NoticeDto;
import com.projectTeam.therapist.model.UserDto;
import com.projectTeam.therapist.repository.NoticeRepository;
import com.projectTeam.therapist.repository.UserRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;
    @Autowired
    private UserRepository userRepository;

    public NoticeDto save(NoticeDto noticeDto) {
        return noticeRepository.save(noticeDto);
    }

    public JSONObject findByUsername(String username, Pageable pageable) {
        Page<NoticeDto> notices = noticeRepository.findByUsernameOrderByNoticeCreatedAtDesc(username, pageable);
        List<NoticeDto> noticeDtos = noticeRepository.findByUsernameOrderByNoticeCreatedAtDesc(username);

        for (NoticeDto notice : noticeDtos) {
            if (notice.is_check() == false) {
                notice.set_check(true);
                noticeRepository.save(notice);
            }
        }

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("username", username);
        jsonObject.put("totalAmount", notices.getTotalElements());
        JSONArray jsonArray = new JSONArray();
        for (NoticeDto notice : notices.getContent()) {
            JSONObject item = new JSONObject();

            notice.set_check(true);
            noticeRepository.save(notice);
            item.put("postId", notice.getPost_id());
            item.put("type", notice.getType());
            item.put("senderUsername", notice.getSenderUser());
            jsonArray.add(item);
        }
        jsonObject.put("notices", jsonArray);

        return jsonObject;
    }

    public int findTotalNotice(String username) {
        List<NoticeDto> notices = noticeRepository.findByUsernameOrderByNoticeCreatedAtDesc(username);
        int totalNotices = 0;

        for (NoticeDto notice : notices) {
            if (notice.is_check() == false) {
                totalNotices += 1;
            }
        }

        return totalNotices;
    }
}
