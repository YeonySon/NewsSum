package com.ssafy.newsum.domain.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.users.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	//email로 회원 정보 찾기
	@Query("select u from User u where u.email=:userEmail")
	Optional<User> findByEmail(@Param("userEmail") String userEmail);

	//이름으로 회원 정보 찾기
	@Query("select u from User u where u.name=:userName")
	Optional<User> findByName(@Param("userName") String userName);
}
