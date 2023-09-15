package com.ssafy.newsum.domain.news.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "media")
@Data
public class Media {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String logo;


}
