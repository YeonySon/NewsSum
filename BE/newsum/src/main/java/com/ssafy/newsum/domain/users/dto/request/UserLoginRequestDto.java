package com.ssafy.newsum.domain.users.dto.request;

import com.ssafy.newsum.domain.users.entity.UserAuthenticateType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserLoginRequestDto {
	private String userEmail;
	private String password;
	private UserAuthenticateType authenticate;
}

