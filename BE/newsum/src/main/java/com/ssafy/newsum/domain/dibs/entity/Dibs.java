package com.ssafy.newsum.domain.dibs.entity;

import com.ssafy.newsum.domain.users.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "dibs")
@Getter
@Builder
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
    @Column(name = "created_at", insertable = false)
    private LocalDateTime createdAt;

    // 날짜 업데이트
    public void updateReadDt() {
        this.createdAt = LocalDateTime.now();
    }

}
