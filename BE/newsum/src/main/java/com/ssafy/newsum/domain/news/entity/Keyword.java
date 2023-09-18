package com.ssafy.newsum.domain.news.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "keyword")
public class Keyword {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "news_id", referencedColumnName = "id")
	private News newsId;

	@Column
	private Integer frequency;

}
