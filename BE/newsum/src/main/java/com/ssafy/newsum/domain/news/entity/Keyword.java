package com.ssafy.newsum.domain.news.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "keyword")
public class Keyword {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "news_id", referencedColumnName = "id")
    private News newsId;

    @Column
    private Integer frequency;


}
