package com.ssafy.newsum.domain.job.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobResponseDto {
	private Integer id;
	private String name;
}
