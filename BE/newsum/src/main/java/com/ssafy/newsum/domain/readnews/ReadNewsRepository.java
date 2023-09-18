package com.ssafy.newsum.domain.readnews;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.readnews.entity.ReadNews;
import com.ssafy.newsum.domain.recommendnews.entity.RecommendNews;

public interface ReadNewsRepository extends JpaRepository<ReadNews, Integer> {
	//user가 해당 기사 읽음 여부 조회
	@Query("select rn from RecommendNews rn where rn.id=:newsId and rn.usrId=:userId")
	Optional<RecommendNews> findByUserId(@Param("newsId") Integer newsId, @Param("userId") Integer userId);
}
