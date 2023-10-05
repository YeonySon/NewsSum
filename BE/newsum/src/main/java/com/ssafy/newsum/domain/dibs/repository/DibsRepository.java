package com.ssafy.newsum.domain.dibs.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.dibs.entity.Dibs;

public interface DibsRepository extends JpaRepository<Dibs, Integer> {

	//좋아요 유무
	@Query("select case when count(a) > 0 then true else false end from Dibs a where a.type = 'n' " +
		"and a.user.userId = :userId " +
		"and a.contentId = :newsId ")
	Boolean isLiked(@Param("userId") Integer userId, @Param("newsId") Integer newsId);

	// 좋아요
	@Query("select d from Dibs d where d.contentId =:newsId and d.user.userId =:userId")
	Optional<Dibs> selectDibs(@Param("newsId") Integer newsId, @Param("userId") Integer userId);

}
