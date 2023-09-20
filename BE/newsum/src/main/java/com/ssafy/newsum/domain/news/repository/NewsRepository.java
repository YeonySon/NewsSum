package com.ssafy.newsum.domain.news.repository;

import com.ssafy.newsum.domain.news.entity.News;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.Tuple;
import java.util.List;

public interface NewsRepository extends JpaRepository<News, Integer> {
    //조회수 증가
    @Modifying(clearAutomatically = true) // 쿼리 실행 이후 영속성 컨텍스트를 초기화시켜준다.
    @Query("update News n set n.viewCnt=n.viewCnt+1 where n.newsId =:newsId")
    void updateViewCnt(@Param("newsId") Integer newsId);


    // 뉴스 추천 리스트 조회
    @Query("select b, m, c from RecommendNews a, News b, Media m, Category c where " +
            "a.newsId = b.newsId " +
            "and a.usrId = :userId " +
            "and b.mediaId.mediaId = m.mediaId " +
            "and b.cgId.categoryId = c.categoryId")
    List<Tuple> selectRecommend(@Param("userId") Integer userId);


    // 카테고리별 리스트 조회
    @Query("select n from News n where n.cgId.categoryId =:categoryId order by n.postedDate desc")
    List<News> selectByCategory(@Param("categoryId") Integer categoryId);


    // 뉴스 전체 조회 최신순으로
    @Query("select n from News n order by n.postedDate desc")
    List<News> selectAllByRecent();

    // 뉴스 전체 인기도순으로 조회
    @Query("select n from News n order by (n.viewCnt + n.totalLike + n.totalScrap) desc, n.postedDate desc")
    List<News> selectAllPopular();


    // 분야별 인기도순으로 가져오기
    @Query("select n from News n " +
            "where n.cgId.categoryId =:categoryId " +
            "order by (n.viewCnt + n.totalLike + n.totalScrap) desc, n.postedDate desc")
    List<News> selectPopularByCategory(@Param("categoryId") Integer categoryId);


}
