package com.ssafy.newsum.domain.users.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TechStackResponseDto {
	private Integer tsId;
	private String tsName;
}
