package com.ssafy.newsum.domain.users.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HeadlineResponseDto {
	private Integer id;
	private String name;
}
