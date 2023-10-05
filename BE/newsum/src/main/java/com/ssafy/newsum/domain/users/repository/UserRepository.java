package com.ssafy.newsum.domain.users.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.newsum.domain.users.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	//회원 탈퇴(상태 변경)
	@Modifying
	@Query("update User u set u.state='정지' where u.userId=:userId")
	void deleteUser(@Param("userId") Integer userId);

	//email로 회원 정보 찾기
	@Query("select u from User u where u.email=:userEmail")
	Optional<User> findByEmail(@Param("userEmail") String userEmail);

	//이름으로 회원 정보 찾기
	@Query("select u from User u where u.name=:userName")
	Optional<User> findByName(@Param("userName") String userName);

	@Query("select u from User u where u.userId =:userId")
	User findUserByUserId(@Param("userId") Integer userId);

	Optional<User> findByRefreshToken(String refreshToken);

	@Modifying(clearAutomatically = true) // 쿼리 실행 이후 영속성 컨텍스트를 초기화시켜준다.
	@Transactional
	@Query("update User u set u.refreshToken = :refreshToken where u.email = :userEmail")
	int updateRefreshToken(@Param("refreshToken") String refreshToken, @Param("userEmail") String userEmail);

	//password 수정
	@Modifying(clearAutomatically = true)
	@Query("update User u set u.password = :password where u.userId = :userId")
	void updatePassword(@Param("userId") Integer userId, @Param("password") String newPassword);

	// newsId에 해당하는 유저 조회
	@Query("select u from User u, ReadNews rn where rn.contentId=:newsId "
		+ "and rn.user.userId=u.userId "
		+ "and u.userId not in :userId")
	List<User> selectUserByNews(@Param("newsId") Integer newsId, @Param("userId") Integer userId);
}
