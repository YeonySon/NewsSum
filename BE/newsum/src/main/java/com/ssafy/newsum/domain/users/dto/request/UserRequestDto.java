package com.ssafy.newsum.domain.users.dto.request;

import java.util.List;

import com.ssafy.newsum.domain.job.Job;
import com.ssafy.newsum.domain.users.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequestDto {
	private Integer id;
	private String email;
	private String name;
	private String password;
	private String birthDate;
	private String authenticate;
	private List<TechRequestDto> tech;
	private List<HeadlineRequestDto> headline;
	private Integer job;

	public User toEntity(UserRequestDto userRequestDto) {
		User user = User.builder()
			.userId(userRequestDto.getId())
			.email(userRequestDto.getEmail())
			.password(userRequestDto.getPassword())
			.name(userRequestDto.getName())
			.birthDate(userRequestDto.getBirthDate())
			.authenticate(userRequestDto.getAuthenticate())
			.job(Job.builder().jobId(userRequestDto.getJob()).build())
			.build();
		return user;
	}
}
