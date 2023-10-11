package com.ssafy.newsum.domain.headline.repository;

import com.ssafy.newsum.domain.headline.entity.Headline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeadlineRepository extends JpaRepository<Headline, Integer> {
}
