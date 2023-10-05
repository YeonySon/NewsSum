package com.ssafy.newsum.domain.users.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.headline.entity.PreferredHeadline;
import com.ssafy.newsum.domain.headline.repository.HeadlineRepository;
import com.ssafy.newsum.domain.headline.repository.PreferredHeadlineRepository;
import com.ssafy.newsum.domain.job.Job;
import com.ssafy.newsum.domain.job.repository.JobRepository;
import com.ssafy.newsum.domain.techstack.entity.PreferredTechStack;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.techstack.repository.PreferredTechStackRepository;
import com.ssafy.newsum.domain.techstack.repository.TechStackRepository;
import com.ssafy.newsum.domain.users.dto.request.HeadlineRequestDto;
import com.ssafy.newsum.domain.users.dto.request.TechRequestDto;
import com.ssafy.newsum.domain.users.dto.request.UserRequestDto;
import com.ssafy.newsum.domain.users.dto.response.UserLoginResponseDto;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;
import com.ssafy.newsum.global.jwt.JwtService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
	private final UserRepository userRepository;
	private final HeadlineRepository headlineRepository;
	private final PreferredHeadlineRepository preferredHeadlineRepository;
	private final TechStackRepository techStackRepository;
	private final PreferredTechStackRepository preferredTechStackRepository;
	private final JwtService jwtService;
	private final PasswordEncoder passwordEncoder;
	private final JobRepository jobRepository;

	@Transactional
	public UserLoginResponseDto updateRefreshToken(User user) {
		String refreshToken = jwtService.createRefreshToken(user.getEmail());
		UserLoginResponseDto successLogin = UserLoginResponseDto.builder()
			.message("success login")
			.accessToken(jwtService.createAccessToken(user.getEmail()))
			.refreshToken(refreshToken)
			.email(user.getEmail())
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

	//기술스택 리스트 출력
	public List<Job> getAllJob() {
		return jobRepository.findAll();
	}

	//아이디 중복 확인
	public Boolean validateId(String email) {
		Optional<User> findUser = userRepository.findByEmail(email);

		if (findUser.isPresent())
			return false;

		return true;
	}

	//회원 가입1. 유저 정보 저장
	@Transactional
	public User signup(UserRequestDto userRequestDto) {
		if (userRequestDto.getAuthenticate() == null)
			userRequestDto.setAuthenticate("UA01");
		userRequestDto.setState("정상");
		User user = userRequestDto.toEntity(userRequestDto);
		//1. 비밀번호 암호화
		user.passwordEncode(passwordEncoder);
		userRepository.save(user);

		//2. 유저 조회
		User findUser = userRepository.findByEmail(userRequestDto.getEmail()).get();
		return findUser;
	}

	//회원 가입2. 기술스택, 헤드라인 정보 저장
	@Transactional
	public Boolean saveTechAndHeadline(UserRequestDto userRequestDto, User user) {
		//1. 기술스택, 헤드라인 리스트 저장
		List<TechRequestDto> techRequestDtoList = userRequestDto.getTech();
		List<HeadlineRequestDto> headlineRequestDtoList = userRequestDto.getHeadline();

		for (TechRequestDto techRequestDto : techRequestDtoList) {
			//입력한 기술스택이 없는 경우
			Optional<TechStack> techStackOp = techStackRepository.findById(techRequestDto.getTechId());

			PreferredTechStack preferredTechStack = techRequestDto.toEntity(techStackOp.get(), user);
			preferredTechStackRepository.save(preferredTechStack);
		}

		for (HeadlineRequestDto headlineRequestDto : headlineRequestDtoList) {
			//입력한 헤드라인이 없는 경우
			Optional<Headline> headlineOp = headlineRepository.findById(headlineRequestDto.getHlId());

			PreferredHeadline preferredHeadline = headlineRequestDto.toEntity(headlineOp.get(), user);
			preferredHeadlineRepository.save(preferredHeadline);
		}

		return true;
	}

	//유저 기술 스택 리스트 조회
	public List<TechStack> getTechStackByUser(Integer userId) {
		log.info("techstack : {}", preferredTechStackRepository.findTechStackByUser(userId));
		return preferredTechStackRepository.findTechStackByUser(userId);
	}

	//유저 헤드라인 리스트 조회
	public List<Headline> getHeadlineByUser(User user) {
		return preferredHeadlineRepository.findHeadlineByUser(user.getUserId());
	}

	//기술 스택 리스트 조회
	public Boolean getTechStack(List<TechRequestDto> techRequestDtoList) {
		for (TechRequestDto techRequestDto : techRequestDtoList) {
			//입력한 기술스택이 없는 경우
			Optional<TechStack> techStackOp = techStackRepository.findById(techRequestDto.getTechId());

			if (techStackOp.isEmpty())
				return false;
		}
		return true;
	}

	//헤드라인 리스트 조회
	public Boolean getHeadline(List<HeadlineRequestDto> headlineRequestDtoList) {
		for (HeadlineRequestDto headlineRequestDto : headlineRequestDtoList) {
			//입력한 기술스택이 없는 경우
			Optional<Headline> headlineOp = headlineRepository.findById(headlineRequestDto.getHlId());

			if (headlineOp.isEmpty())
				return false;
		}
		return true;
	}

	//비밀번호 수정
	@Transactional
	public User updatePassword(Integer id, UserRequestDto userRequestDto) {
		userRequestDto.setId(id);
		User user = userRequestDto.toEntity(userRequestDto);
		log.info("userId : {}", id);
		log.info("userpassword : {}", userRequestDto.getPassword());
		//1. 비밀번호 암호화
		user.passwordEncode(passwordEncoder);

		//2. 저장
		userRepository.updatePassword(id, user.getPassword());
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
		userRepository.deleteUser(user.getUserId());
		log.info("user : {}", userRepository.findByEmail(userEmail));
		return true;
	}

	//로그아웃
	@Transactional
	public void logout(String userEmail) {
		User user = userRepository.findByEmail(userEmail).get();
		user.resetRefreshToken();
	}

	//이메일로 회원 조회
	public Optional<User> getUserByEmail(String userEmail) {
		return userRepository.findByEmail(userEmail);
	}

	//아이디로 회원 조회
	public User getUserById(Integer id) {
		return userRepository.findById(id).get();
	}
}
