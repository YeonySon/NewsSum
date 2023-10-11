package com.ssafy.newsum.domain.readnews.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.readnews.entity.ReadNews;

public interface ReadNewsRepository extends JpaRepository<ReadNews, Integer> {
	//user가 해당 기사 읽음 여부 조회
	@Query("select rn from ReadNews rn where rn.contentId=:newsId and rn.user.userId=:userId")
	Optional<ReadNews> findReadByUserId(@Param("newsId") Integer newsId, @Param("userId") Integer userId);

}
