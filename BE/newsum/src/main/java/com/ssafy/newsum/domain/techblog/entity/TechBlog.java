package com.ssafy.newsum.domain.techblog.entity;


import com.ssafy.newsum.domain.company.entity.Company;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "tech_blog")
@Getter
public class TechBlog {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer blogId;


    @Column
    private String head;

    @Column(name = "posted_date")
    private String postedDate;

    @Column
    private String url;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cp_id", referencedColumnName = "id")
    private Company cpId;


}
