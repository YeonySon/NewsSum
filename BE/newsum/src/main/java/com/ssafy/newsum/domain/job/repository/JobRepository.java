package com.ssafy.newsum.domain.job.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.job.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {
	// userId에 해당하는 직업 조회
	@Query("select j from Job j, User u, ReadNews rn where rn.contentId=:newsId and u.job.jobId=j.jobId")
	Job selectJobByUser(@Param("newsId") Integer newsId);
}
