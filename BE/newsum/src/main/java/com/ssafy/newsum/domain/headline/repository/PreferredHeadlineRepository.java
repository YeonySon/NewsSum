package com.ssafy.newsum.domain.headline.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.newsum.domain.headline.entity.PreferredHeadline;

public interface PreferredHeadlineRepository extends JpaRepository<PreferredHeadline, Integer> {
}
