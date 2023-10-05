package com.ssafy.newsum.domain.users.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.newsum.domain.email.EmailService;
import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.job.Job;
import com.ssafy.newsum.domain.job.dto.response.JobResponseDto;
import com.ssafy.newsum.domain.job.service.JobService;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.users.dto.request.HeadlineRequestDto;
import com.ssafy.newsum.domain.users.dto.request.TechRequestDto;
import com.ssafy.newsum.domain.users.dto.request.UserLoginRequestDto;
import com.ssafy.newsum.domain.users.dto.request.UserRequestDto;
import com.ssafy.newsum.domain.users.dto.response.HeadlineResponseDto;
import com.ssafy.newsum.domain.users.dto.response.TechResponseDto;
import com.ssafy.newsum.domain.users.dto.response.UserInfoDto;
import com.ssafy.newsum.domain.users.dto.response.UserLoginResponseDto;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.service.UserService;
import com.ssafy.newsum.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
	private final UserService userService;
	private final EmailService emailService;
	private final JobService jobService;
	private final PasswordEncoder passwordEncoder;

	//헤드라인 리스트 출력
	@GetMapping("/headline")
	public ResponseEntity<CommonResponseDto<?>> getHeadlineList() {
		List<Headline> headlineList = userService.getAllHeadline();
		List<HeadlineResponseDto> headlineResponseDtoList = new ArrayList<>();

		for (Headline headline : headlineList) {
			HeadlineResponseDto headlineResponseDto = HeadlineResponseDto.builder()
				.id(headline.getHlId())
				.name(headline.getHlName())
				.build();

			headlineResponseDtoList.add(headlineResponseDto);
		}

		return ResponseEntity.ok(
			CommonResponseDto.success(200, "success print headlineList", headlineResponseDtoList));
	}

	//기술스택 리스트 출력
	@GetMapping("/techstack")
	public ResponseEntity<CommonResponseDto<?>> getTechStackList() {
		List<TechStack> techStackList = userService.getAllTechStack();
		List<TechResponseDto> techStackResponseDtoList = new ArrayList<>();

		for (TechStack techStack : techStackList) {
			TechResponseDto techStackResponseDto = TechResponseDto.builder()
				.id(techStack.getTsId())
				.name(techStack.getTsName())
				.build();

			techStackResponseDtoList.add(techStackResponseDto);
		}

		return ResponseEntity.ok(
			CommonResponseDto.success(200, "success print tech-stack list", techStackList));
	}

	//직업 리스트 출력
	@GetMapping("/jobs")
	public ResponseEntity<CommonResponseDto<?>> getJobList() {
		List<Job> jobList = userService.getAllJob();
		List<JobResponseDto> jobResponseDtoList = new ArrayList<>();

		for (Job job : jobList) {
			JobResponseDto jobResponseDto = JobResponseDto.builder()
				.id(job.getJobId())
				.name(job.getJobName())
				.build();

			jobResponseDtoList.add(jobResponseDto);
		}

		return ResponseEntity.ok(
			CommonResponseDto.success(200, "success print headlineList", jobResponseDtoList));
	}

	//아이디 중복 체크 + 이메일 전송
	@GetMapping("/id")
	public ResponseEntity<CommonResponseDto<?>> validateId(
		@RequestParam String email) throws Exception {
		Boolean isUsed = userService.validateId(email);

		if (isUsed) {
			//이메일 전송
			log.info("try send email [email] - [{}]", email);
			String confirmCode = emailService.sendSimpleMessage(email);
			return ResponseEntity.ok(CommonResponseDto.success(200, "can use email", confirmCode));
		}
		//실패
		return ResponseEntity.ok(CommonResponseDto.error(400, "exist email"));
	}

	//회원 가입
	@PostMapping
	@Transactional
	public ResponseEntity<CommonResponseDto<?>> signup(@RequestBody UserRequestDto userRequestDto) {
		//아이디 중복 검사
		if (!userService.validateId(userRequestDto.getEmail())) {
			return ResponseEntity.ok(
				CommonResponseDto.error(400, "exist email [" + userRequestDto.getEmail() + "]"));
		}

		//1. 유저 정보 유무 확인
		if (userService.getUserByEmail(userRequestDto.getEmail()).isPresent()) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "exist email"));
		}

		//2. 기술 스택, 헤드라인, 직업 유무 확인
		List<TechRequestDto> techRequestDtoList = userRequestDto.getTech();
		List<HeadlineRequestDto> headlineRequestDtoList = userRequestDto.getHeadline();
		if (!userService.getTechStack(techRequestDtoList)) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "do not exist techStack"));
		}
		if (!userService.getHeadline(headlineRequestDtoList)) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "do not exist headline"));
		}
		if (!jobService.getJobById(userRequestDto.getJob())) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "do not exist job"));
		}

		//유저정보 저장
		User user = userService.signup(userRequestDto);

		//기술스택, 헤드라인 정보 저장
		userService.saveTechAndHeadline(userRequestDto, user);

		UserInfoDto userInfoDto = UserInfoDto.builder()
			.id(user.getUserId())
			.email(user.getEmail())
			.name(user.getName())
			.birthDate(user.getBirthDate())
			.build();
		return ResponseEntity.ok(CommonResponseDto.success(200, "success signup", userInfoDto));
	}

	// 비밀번호 수정
	@PatchMapping("/{userId}")
	public ResponseEntity<CommonResponseDto<?>> updatePassword(@PathVariable Integer userId,
		@RequestBody UserRequestDto userRequestDto) {
		userService.updatePassword(userId, userRequestDto);
		return ResponseEntity.ok(CommonResponseDto.success(200, "success update userInfo", null));
	}

	//회원 탈퇴
	@DeleteMapping
	public ResponseEntity<CommonResponseDto<?>> withdrawl(Authentication authentication) {
		String email = authentication.getName();
		log.info(email);
		Boolean isDelete = userService.withdrawal(email);
		if (!isDelete) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "do not exist email"));
		}
		return ResponseEntity.ok(CommonResponseDto.success(200, "success delete user", null));
	}

	//로그인
	@PostMapping("/login")
	public ResponseEntity<CommonResponseDto<?>> login(@RequestBody @Valid UserLoginRequestDto request) {
		CommonResponseDto fResponse = CommonResponseDto.builder().statusCode(400).build();
		Optional<User> userOp = userService.getUserByEmail(request.getEmail());

		// 아이디 존재하지 않음
		if (userOp.isEmpty()) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "do not exist email"));
		}

		User user = userOp.get();

		//회원 탈퇴한 유저의 경우 로그인 불가
		if (user.getState().equals("정지")) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "withdrawl user"));
		}
		// 비밀번호 틀림
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "wrong password"));
		}

		// 로그인
		UserLoginResponseDto userResponse = userService.updateRefreshToken(user);
		return ResponseEntity.ok(CommonResponseDto.success(200, "success login", userResponse));
	}

	//로그아웃
	@GetMapping("/logout")
	public ResponseEntity<CommonResponseDto> logout(Authentication authentication) {
		userService.logout(authentication.getName());
		return ResponseEntity.ok(CommonResponseDto.success(200, "success logout", null));
	}

}
