package com.ssafy.newsum.domain.job.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.job.Job;
import com.ssafy.newsum.domain.users.entity.User;

public interface JobRepository extends JpaRepository<Job, Integer> {
	// newsId에 해당하는 직업 조회
	@Query("select u.job from User u, ReadNews rn where rn.contentId=:newsId "
		+ "and rn.user.userId=u.userId "
		+ "and u.userId not in :userId")
	List<Job> selectUserJobByNews(@Param("newsId") Integer newsId, @Param("userId") Integer userId);

	// userId에 해당하는 유저 조회
	@Query("select u from User u, ReadNews rn where rn.contentId=:newsId "
		+ "and rn.user.userId=u.userId "
		+ "and u.userId not in :userId")
	List<User> selectUserByNews(@Param("newsId") Integer newsId, @Param("userId") Integer userId);
}
