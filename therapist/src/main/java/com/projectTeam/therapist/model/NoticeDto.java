package com.projectTeam.therapist.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class NoticeDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notice_id;

    private String type;
    private String username;
    private Long post_id;
    @Builder.Default
    private boolean is_check = false;

    @Column(updatable = false)
    private LocalDateTime noticeCreatedAt;
    private LocalDateTime noticeUpdatedAt;

    // DB에 INSERT를 날리기전에 해당 메서드를 먼저 실행하여 현재시각과 업데이트 시각을 설정한다.
    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.noticeCreatedAt = now;
        this.noticeUpdatedAt = now;
    }

    // 해당 테이블로 UPDATE문이 들어왔을때 트리거처럼 호출되며 업데이트 시각을 현재시각으로 설정한다.
    @PreUpdate
    public void preUpdate() {
        this.noticeUpdatedAt = LocalDateTime.now();
    }
}
