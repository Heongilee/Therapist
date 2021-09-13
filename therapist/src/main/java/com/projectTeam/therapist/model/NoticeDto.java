package com.projectTeam.therapist.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
}
