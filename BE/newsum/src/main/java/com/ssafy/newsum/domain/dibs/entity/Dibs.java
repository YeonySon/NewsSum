package com.ssafy.newsum.domain.dibs.entity;

import com.ssafy.newsum.domain.users.entity.User;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "like")
@Getter
public class Dibs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer dibsId;
    private Character type;
    @Column(name = "content_id")
    private Integer contentId;
    @ManyToOne
    @JoinColumn(name = "usr_id")
    private User user;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
