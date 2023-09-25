package com.ssafy.newsum.domain.techstack.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.newsum.domain.techstack.entity.PreferredTechStack;

public interface PreferredTechStackRepository extends JpaRepository<PreferredTechStack, Integer> {
	@Query("select p from PreferredTechStack p where p.user.userId =:userId")
	List<PreferredTechStack> findByUserId(@Param("userId") Integer userId);

}
