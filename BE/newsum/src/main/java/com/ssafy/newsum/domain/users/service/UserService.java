package com.ssafy.newsum.domain.users.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.headline.repository.HeadlineRepository;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.techstack.repository.TechStackRepository;
import com.ssafy.newsum.domain.users.dto.request.UserRequestDto;
import com.ssafy.newsum.domain.users.dto.response.UserLoginResponseDto;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;
import com.ssafy.newsum.global.jwt.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final HeadlineRepository headlineRepository;
	private final TechStackRepository techStackRepository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public UserLoginResponseDto updateRefreshToken(User user) {
		String refreshToken = jwtService.createRefreshToken(user.getEmail());
		UserLoginResponseDto successLogin = UserLoginResponseDto.builder()
			.message("success login")
			.accessToken(jwtService.createAccessToken(user.getEmail()))
			.refreshToken(refreshToken)
			.userEmail(user.getEmail())
			.usrId(user.getUserId())
			.build();
		userRepository.updateRefreshToken(refreshToken, user.getEmail());
		return successLogin;

	}

	//기술스택 리스트 출력
	public List<TechStack> getAllTechStack() {
		return techStackRepository.findAll();
	}

	//헤드라인 리스트 출력
	public List<Headline> getAllHeadline() {
		return headlineRepository.findAll();
	}

	//아이디 중복 확인
	public Boolean validateId(String email) {
		Optional<User> findUser = userRepository.findByEmail(email);

		if (findUser.isPresent())
			return false;

		return true;
	}

	//회원 가입
	@Transactional
	public User signup(UserRequestDto userRequestDto) {
		if (userRequestDto.getAuthenticate() == null)
			userRequestDto.setAuthenticate("UA01");
		User user = userRequestDto.toEntity(userRequestDto);
		//1. 비밀번호 암호화
		user.passwordEncode(passwordEncoder);
		userRepository.save(user);

		//2. 유저 조회
		User findUser = userRepository.findByEmail(userRequestDto.getUserEmail()).get();
		return findUser;
	}

	//비밀번호 수정
	@Transactional
	public User updatePassword(Integer id, UserRequestDto userRequestDto) {
		userRequestDto.setId(id);
		User user = userRequestDto.toEntity(userRequestDto);
		//1. 비밀번호 암호화
		user.passwordEncode(passwordEncoder);

		//2. 저장
		userRepository.updatePassword(user.getEmail(), user.getPassword());
		return user;
	}

	//회원 탈퇴(계정 삭제)
	@Transactional
	public boolean withdrawal(String userEmail) {
		Optional<User> userObject = userRepository.findByEmail(userEmail);
		//user 계정 유무 확인
		if (userObject.isEmpty()) {
			return false;
		}

		User user = userObject.get();
		userRepository.deleteById(user.getUserId());
		return true;
	}

	//로그아웃
	@Transactional
	public void logout(String userEmail) {
		User user = userRepository.findByEmail(userEmail).get();
		user.resetRefreshToken();
	}

	//이메일로 회원 조회
	public User getUserByEmail(String userEmail) {
		return userRepository.findByEmail(userEmail).get();
	}

	//아이디로 회원 조회
	public User getUserById(Integer id) {
		return userRepository.findById(id).get();
	}
}
