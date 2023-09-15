package com.ssafy.newsum.users.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.ssafy.newsum.headline.entity.Headline;
import com.ssafy.newsum.users.entity.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name="preferred_headline")
@Getter
public class PreferredHeadline {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private Integer prefHlId;

	@ManyToOne
	@JoinColumn(name="usr_id")
	private User user;

	@ManyToOne
	@JoinColumn(name="hl_id")
	private Headline headline;
}
