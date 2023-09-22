package com.ssafy.newsum.domain.news.repository;

import com.ssafy.newsum.domain.news.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
