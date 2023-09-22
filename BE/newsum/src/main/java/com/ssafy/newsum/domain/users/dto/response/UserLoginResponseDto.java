package com.ssafy.newsum.domain.users.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserLoginResponseDto {
	private Integer statusCode;
	private String message;
	private String accessToken;
	private String refreshToken;
	private String userEmail;
	private Integer usrId;
}