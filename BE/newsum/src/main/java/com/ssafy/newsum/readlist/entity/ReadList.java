package com.ssafy.newsum.readlist.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.apache.ibatis.annotations.Many;

import com.ssafy.newsum.users.entity.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="read_list")
@Getter

public class ReadList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer rlId;
	private Character type;

	@Column(name="content_id")
	private int contentId;

	@Column(name="read_dt")
	private LocalDateTime readDt;

	@ManyToOne
	@JoinColumn(name="usr_id")
	private User user;
}
