package com.ssafy.newsum.domain.news.repository;


import com.ssafy.newsum.domain.news.entity.News;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

import javax.persistence.Tuple;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.news.entity.News;

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
            "and b.cgId.categoryId = c.categoryId " +
            "and a.isRead =0 " +
            "order by a.createdTime desc")
    List<Tuple> selectRecommend(@Param("userId") Integer userId, Pageable pageable);


    // 카테고리별 리스트 조회
    @Query("select n from News n where n.cgId.categoryId =:categoryId order by n.postedDate desc")
    Page<News> selectByCategory(@Param("categoryId") Integer categoryId, Pageable pageable);


    // 뉴스 전체 조회 최신순으로
    @Query("select n from News n order by n.postedDate desc")
    Page<News> selectAllByRecent(Pageable pageable);

    // 뉴스 전체 인기도순으로 조회
    @Query("select n from News n order by (n.viewCnt + n.totalLike + n.totalScrap) desc, n.postedDate desc")
    Page<News> selectAllPopular(Pageable pageable);


    // 분야별 인기도순으로 가져오기
    @Query("select n from News n " +
            "where n.cgId.categoryId =:categoryId " +
            "order by (n.viewCnt + n.totalLike + n.totalScrap) desc, n.postedDate desc")
    Page<News> selectPopularByCategory(@Param("categoryId") Integer categoryId, Pageable pageable);


    // 해당 검색어 헤드라인에 있으면 가져오기
    @Query("select n from News n where n.head like %:keyword% order by n.postedDate desc")
    Page<News> searchNews(@Param("keyword") String keyword, Pageable pageable);

    // 내가 읽은 뉴스 최신순으로 조회
    @Query("select n from News n, ReadNews r where r.user.userId =:userId and r.type='n' " +
            "and r.contentId = n.newsId order by  r.readDt desc")
    Page<News> selectAllMyReadNews(@Param("userId") Integer userId, Pageable pageable);

    // 내가 스크랩한 뉴스 전체 최신순으로 조회
    @Query("select n from News n, Scrap s where s.user.userId =:userId and s.contentId = n.newsId " +
            "order by s.createdAt desc")
    Page<News> selectAllMyScrapNews(@Param("userId") Integer userId, Pageable pageable);

    // 내가 스크랩한 뉴스 카테고리별 조회 스크랩한 순
    @Query("select n from News n, Scrap s where s.user.userId =:userId and s.contentId = n.newsId " +
            "and n.cgId.categoryId =:categoryId order by s.createdAt desc")
    Page<News> selectMyScrapNewsByCategory(@Param("userId") Integer userId, @Param("categoryId") Integer categoryId,
                                           Pageable pageable);

    // 내가 스크랩 뉴스 전체 인기도순으로 조회
    @Query("select n from News n, Scrap s where s.user.userId =:userId and s.contentId = n.newsId " +
            "order by (n.viewCnt + n.totalLike + n.totalScrap) desc, s.createdAt desc")
    Page<News> selectAllScrapPopular(@Param("userId") Integer userId, Pageable pageable);

    // 내가 스크랩 뉴스 분야별 인기도순을 조회
    @Query("select n from News n, Scrap s where s.user.userId =:userId and s.contentId = n.newsId " +
            "and n.cgId.categoryId =:categoryId " +
            "order by (n.viewCnt + n.totalLike + n.totalScrap) desc, s.createdAt desc")
    Page<News> selectScrapCategoryByOption(@Param("userId") Integer userId, @Param("categoryId") Integer categoryId,
                                           Pageable pageable);

	// 읽은 뉴스에서 형태소 조회
	@Query("select n.nouns from News n, ReadNews rn where rn.user.userId=:userId and n.newsId=rn.contentId")
	List<String> selectNounsByNews(@Param("userId") Integer userId);

	// 읽은 뉴스 카테고리 조회
	@Query("select c.categoryId, c.name, count(c) from Category c, News n, ReadNews rn "
		+ "where rn.user.userId=:userId and n.newsId=rn.contentId and c.categoryId=n.cgId.categoryId "
		+ "group by c.categoryId "
		+ "order by c.categoryId")
	List<String[]> selectCategoryByReadNews(@Param("userId") Integer userId);

	// 스크랩 뉴스 카테고리 조회
	@Query("select c.categoryId, c.name, count(c) from Category c, News n, Scrap s "
		+ "where s.user.userId=:userId and n.newsId=s.contentId and c.categoryId=n.cgId.categoryId "
		+ "group by c.categoryId "
		+ "order by c.categoryId")
	List<String[]> selectCategoryByScrap(@Param("userId") Integer userId);

}
