package com.ssafy.newsum.domain.scrap.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.scrap.entity.Scrap;

public interface ScrapRepository extends JpaRepository<Scrap, Integer> {

	//스크랩 유무
	@Query("select case when count(a)>0 then true else false end from Scrap a where a.type = 'n' " +
		"and a.user.userId = :userId " +
		"and a.contentId = :newsId")
	Boolean isScrap(@Param("userId") Integer userId, @Param("newsId") Integer newsId);

	// 스크랩 가져오기
	@Query("select s from Scrap s where s.contentId =:newsId and s.user.userId =:userId")
	Optional<Scrap> selectScrap(@Param("newsId") Integer newsId, @Param("userId") Integer userId);

}
