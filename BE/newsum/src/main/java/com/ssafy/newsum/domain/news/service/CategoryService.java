package com.ssafy.newsum.domain.news.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.newsum.domain.news.entity.Category;
import com.ssafy.newsum.domain.news.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
	private final CategoryRepository categoryRepository;

	//카테고리 리스트 조회
	public List<Category> getCategory() {
		return categoryRepository.findAll();
	}
}
