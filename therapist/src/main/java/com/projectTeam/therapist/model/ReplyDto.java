package com.projectTeam.therapist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class ReplyDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDto userDto;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private PostDto postDto;

    private String replyContent;
    private int star;

//    @OneToMany(mappedBy = "replyDto", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<ReplyCommentDto> replyComments = new ArrayList<>();

    @Column(updatable = false)
    private LocalDateTime postCreatedAt;
    private LocalDateTime postUpdatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.postCreatedAt = now;
        this.postUpdatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.postUpdatedAt = LocalDateTime.now();
    }
}