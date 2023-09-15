package com.ssafy.newsum.domain.techblog.entity;

import lombok.Data;
import org.apache.ibatis.annotations.Many;

import javax.persistence.*;

@Entity
@Data
@Table(name = "tech_blog")
public class TechBlog {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String head;

    @Column(name = "posted_date")
    private String postedDate;

    @Column
    private String url;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "cp_id", referencedColumnName = "id")
//    private Company cpId;

}
