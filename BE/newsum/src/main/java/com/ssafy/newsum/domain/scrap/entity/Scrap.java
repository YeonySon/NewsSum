package com.ssafy.newsum.domain.scrap.entity;

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
@Table(name = "scrap")
@Getter
public class Scrap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer sId;
    private Character type;
    @Column(name = "content_id")
    private Integer contentId;
    @ManyToOne
    @JoinColumn(name = "usr_id")
    private User user;
    @Column(name = "created_at")
    private LocalDateTime createdAt;


}
