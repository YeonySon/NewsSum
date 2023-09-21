package com.ssafy.newsum.domain.users.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoDto {
	private Integer id;
	private String email;
	private String password;
	private String birthDate;
	private String name;

}