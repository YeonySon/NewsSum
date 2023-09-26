package com.ssafy.newsum.domain.users.dto.request;

import com.ssafy.newsum.domain.techstack.entity.PreferredTechStack;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.users.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TechRequestDto {

	private Integer techId;

	public PreferredTechStack toEntity(TechStack techStack, User user) {
		PreferredTechStack preferredTechStack = PreferredTechStack.builder()
			.techStack(techStack)
			.user(user)
			.build();
		return preferredTechStack;
	}

}
