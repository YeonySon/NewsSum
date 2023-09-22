package com.ssafy.newsum.domain.news.repository;

import com.ssafy.newsum.domain.news.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeywordRepository extends JpaRepository<Keyword, Integer> {
}
