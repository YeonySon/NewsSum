package com.ssafy.newsum.domain.users.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserLoginResponseDto {
	private String accessToken;
	private String refreshToken;
	private String message;
	private String email;
	private Integer usrId;
}