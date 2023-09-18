package com.ssafy.newsum.domain.recommendnews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.recommendnews.entity.RecommendNews;

public interface RecommendNewsRepository extends JpaRepository<RecommendNews, Integer> {
	//조회수 증가
	@Modifying(clearAutomatically = true) // 쿼리 실행 이후 영속성 컨텍스트를 초기화시켜준다.
	@Query("update News n set n.viewCnt=n.viewCnt+1 where n.id=:newsId")
	void updateViewCnt(@Param("newsId") Integer newsId);
}
