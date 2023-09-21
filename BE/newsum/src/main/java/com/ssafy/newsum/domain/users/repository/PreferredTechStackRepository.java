package com.ssafy.newsum.domain.users.repository;

import com.ssafy.newsum.domain.users.entity.PreferredTechStack;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PreferredTechStackRepository extends JpaRepository<PreferredTechStack, Integer> {

    @Query("select p from PreferredTechStack p where p.user.userId =:userId")
    List<PreferredTechStack> findByUserId(@Param("userId") Integer userId);

}
