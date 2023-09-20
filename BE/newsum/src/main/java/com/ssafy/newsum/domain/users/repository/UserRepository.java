package com.ssafy.newsum.domain.users.repository;

import com.ssafy.newsum.domain.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    //email로 회원 정보 찾기
    @Query("select u from User u where u.email=:userEmail")
    Optional<User> findByEmail(@Param("userEmail") String userEmail);

    //이름으로 회원 정보 찾기
    @Query("select u from User u where u.name=:userName")
    Optional<User> findByName(@Param("userName") String userName);


    @Query("select u from User u where u.userId =:userId")
    User findUserByUserId(@Param("userId") Integer userId);

}
