package com.projectTeam.therapist.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class SessionDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    private String sessionTitle;

    @Column(updatable = false)
    private LocalDateTime sessionCreatedAt;
    private LocalDateTime sessionUpdatedAt;

    @Column(columnDefinition = "integer default 0")
    private Integer numConnectedObject;

    @Column(columnDefinition = "varchar(255) default 'Anonymous'")
    private String sessionModerator;

    // DB에 INSERT를 날리기전에 해당 메서드를 먼저 실행하여 현재시각과 업데이트 시각을 설정한다.
    @PrePersist
    public void prePersist() {
        // utc
//        LocalDateTime now = LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime();
        LocalDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
        this.sessionCreatedAt = now;
        this.sessionUpdatedAt = now;
    }

    // 해당 테이블로 UPDATE문이 들어왔을때 트리거처럼 호출되며 업데이트 시각을 현재시각으로 설정한다.
    @PreUpdate
    public void preUpdate() {
        // utc
//        this.sessionUpdatedAt = LocalDateTime.now().atZone(ZoneId.of("Asia/Seoul")).toLocalDateTime();
        this.sessionUpdatedAt = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
    }
}
