package com.ssafy.newsum.domain.news.entity;


import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "category")
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;


}
