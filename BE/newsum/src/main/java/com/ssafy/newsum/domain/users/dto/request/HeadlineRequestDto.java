package com.ssafy.newsum.domain.users.dto.request;

import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.headline.entity.PreferredHeadline;
import com.ssafy.newsum.domain.users.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class HeadlineRequestDto {
	private Integer hlId;

	public PreferredHeadline toEntity(Headline headline, User user) {
		PreferredHeadline preferredHeadline = PreferredHeadline.builder()
			.headline(headline)
			.user(user)
			.build();
		return preferredHeadline;
	}
}
