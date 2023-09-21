package com.ssafy.newsum.domain.readnews.entity;


import com.ssafy.newsum.domain.users.entity.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "read_news")
@Builder
@Getter
public class ReadNews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer rlId;
    private Character type;

    @Column(name = "content_id")
    private int contentId;

    @Column(name = "read_dt", insertable = false)
    private LocalDateTime readDt;

    @ManyToOne
    @JoinColumn(name = "usr_id")
    private User user;

    // 날짜 업데이트
    public void updateReadDt() {
        this.readDt = LocalDateTime.now();
    }

}
