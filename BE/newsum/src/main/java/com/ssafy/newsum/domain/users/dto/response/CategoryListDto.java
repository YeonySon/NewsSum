package com.ssafy.newsum.domain.users.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryListDto {
	private List<CategoryDto> read;
	private List<CategoryDto> scrap;
}
