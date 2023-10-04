package com.ssafy.newsum.domain.users.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDto {
	private Integer categoryId;
	private String name;
	private Integer cnt;
}
