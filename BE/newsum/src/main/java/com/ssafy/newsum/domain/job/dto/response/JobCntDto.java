package com.ssafy.newsum.domain.job.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobCntDto {
	private Integer id;
	private String name;
	private Integer cnt;
}
