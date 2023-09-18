package com.ssafy.newsum.domain.techblog.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "tech_blog")
public class TechBlog {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
