package com.ssafy.newsum.domain.techstack.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.techstack.entity.PreferredTechStack;
import com.ssafy.newsum.domain.techstack.entity.TechStack;

public interface PreferredTechStackRepository extends JpaRepository<PreferredTechStack, Integer> {
	@Query("select p from PreferredTechStack p where p.user.userId =:userId")
	List<PreferredTechStack> findByUserId(@Param("userId") Integer userId);

	@Query("select ts from TechStack ts, PreferredTechStack p where p.user.userId =:userId")
	List<TechStack> findTechStackByUser(@Param("userId") Integer userId);
}
