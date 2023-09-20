package com.ssafy.newsum.domain.recommendnews.repository;

import com.ssafy.newsum.domain.recommendnews.entity.RecommendNews;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RecommendnewsRepository extends JpaRepository<RecommendNews, Integer> {

    @Query("update RecommendNews r set r.isRead = 1 where r.newsId =:newsId and r.usrId =:userId")
    void updateRecommendIsRead(@Param("newsId") Integer newsId, @Param("userId") Integer userId);

    // 추천기사 사용자 id 기준으로 조회
    @Query("select r from RecommendNews r where r.usrId =:userId")
    List<RecommendNews> findByUserId(@Param("userId") Integer userId);


}
