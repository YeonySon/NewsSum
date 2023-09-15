package com.ssafy.newsum.domain.recommendnews.entity;


import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Table(name = "recommend_news")
public class RecommendNews {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private Integer newsId;

    @Column(name = "usr_id")
    private Integer usrId;

    @Column(name = "is_read")
    private Integer isRead;




}
