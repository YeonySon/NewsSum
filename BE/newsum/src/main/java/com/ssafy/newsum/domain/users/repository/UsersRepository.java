package com.ssafy.newsum.domain.users.repository;

import com.ssafy.newsum.domain.users.entity.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UsersRepository extends JpaRepository<User, Integer> {

    @Query("select u from User u where u.userId =:userId")
    User findUserByUserId(@Param("userId") Integer userId);

}
