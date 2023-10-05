package com.ssafy.newsum.domain.recommendnews.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.recommendnews.entity.RecommendNews;

public interface RecommendnewsRepository extends JpaRepository<RecommendNews, Integer> {

	@Modifying
	@Query("update RecommendNews r set r.isRead = 1 where r.newsId =:newsId and r.usrId =:userId")
	void updateRecommendIsRead(@Param("newsId") Integer newsId, @Param("userId") Integer userId);

	// 추천기사 사용자 id 기준으로 조회
	@Query("select r from RecommendNews r where r.usrId =:userId")
	List<RecommendNews> findByUserId(@Param("userId") Integer userId);

}
