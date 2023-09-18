package com.ssafy.newsum.domain.headline;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.newsum.domain.headline.entity.Headline;

public interface HeadlineRepository extends JpaRepository<Headline, Integer> {
}
