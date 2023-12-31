package com.ssafy.newsum.domain.users.dto.response;

import java.util.List;

import com.ssafy.newsum.domain.job.dto.response.JobCntDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AnalyzeResultResponseDto {
	private List<Keywords> keywordlist;
	private CategoryListDto readList;
	private List<JobCntDto> jobList;
}
