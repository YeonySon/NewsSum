package com.ssafy.newsum.domain.users.dto.request;

import com.ssafy.newsum.domain.users.entity.UserAuthenticateType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserLoginRequestDto {
	private String email;
	private String password;
	private UserAuthenticateType authenticate;
}

