package com.ssafy.newsum.domain.headline.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.headline.entity.PreferredHeadline;

public interface PreferredHeadlineRepository extends JpaRepository<PreferredHeadline, Integer> {
	//유저 헤드라인 조회
	@Query("select h from Headline h, PreferredHeadline ph where ph.user.userId =:userId")
	List<Headline> findHeadlineByUser(@Param("userId") Integer userId);
}
