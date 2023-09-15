package com.ssafy.newsum.dibs.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ssafy.newsum.users.entity.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="like")
@Getter
public class Dibs {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer dibsId;
	private Character type;
	@Column(name="content_id")
	private Integer contentId;
	@ManyToOne
	@JoinColumn(name="usr_id")
	private User user;
	@Column(name="created_at")
	private LocalDateTime createdAt;
}
