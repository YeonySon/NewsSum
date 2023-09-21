package com.ssafy.newsum.domain.users.dto.request;

import com.ssafy.newsum.domain.users.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserRequestDto {
	private Integer id;
	private String userEmail;
	private String name;
	private String password;
	private String birthDate;
	private String authenticate;

	public User toEntity(UserRequestDto userRequestDto) {
		User user = User.builder()
			.userId(userRequestDto.getId())
			.email(userRequestDto.getUserEmail())
			.password(userRequestDto.getPassword())
			.name(userRequestDto.getName())
			.birthDate(userRequestDto.getBirthDate())
			.authenticate(userRequestDto.getAuthenticate())
			.build();
		return user;
	}
}
