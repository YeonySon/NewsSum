package com.ssafy.newsum.domain.users.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.users.dto.request.UserLoginRequestDto;
import com.ssafy.newsum.domain.users.dto.request.UserRequestDto;
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
	private final PasswordEncoder passwordEncoder;

	//헤드라인 리스트 출력
	@GetMapping("/headline")
	public ResponseEntity<CommonResponseDto<?>> getHeadlineList() {
		List<Headline> headlineList = userService.getAllHeadline();

		return ResponseEntity.ok(
			CommonResponseDto.success(200, "success print headlineList", headlineList));
	}

	//기술스택 리스트 출력
	@GetMapping("/techstack")
	public ResponseEntity<CommonResponseDto<?>> getTechStackList() {
		List<TechStack> techStackList = userService.getAllTechStack();

		return ResponseEntity.ok(
			CommonResponseDto.success(200, "success print tech-stack list", techStackList));
	}

	//아이디 중복 체크 + 이메일 전송
	@PostMapping("/id")
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
	public ResponseEntity<CommonResponseDto<?>> signup(@RequestBody UserRequestDto userRequestDto) {
		//아이디 중복 검사
		if (!userService.validateId(userRequestDto.getUserEmail())) {
			return ResponseEntity.ok(
				CommonResponseDto.error(400, "exist email [" + userRequestDto.getUserEmail() + "]"));
		}
		//회원정보 저장
		User user = userService.signup(userRequestDto);
		UserInfoDto userInfoDto = UserInfoDto.builder()
			.id(user.getUserId())
			.email(user.getEmail())
			.name(user.getName())
			.birthDate(user.getBirthDate())
			.build();
		return ResponseEntity.ok(CommonResponseDto.success(200, "success signup", userInfoDto));
	}

	// 회원 정보 조회
	@GetMapping("/{userId}")
	public ResponseEntity<CommonResponseDto<?>> getUserInfo(@PathVariable Integer userId) {
		User user = userService.getUserById(userId);
		UserInfoDto userInfoDto = UserInfoDto.builder()
			.email(user.getEmail())
			.name(user.getName())
			.birthDate(user.getBirthDate())
			.build();

		return ResponseEntity.ok(CommonResponseDto.success(200, "success find userInfo", userInfoDto));
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
		return ResponseEntity.ok(CommonResponseDto.success(200, "success delete user", null));
	}

	//로그인
	@PostMapping("/login")
	public ResponseEntity<CommonResponseDto<?>> login(@RequestBody @Valid UserLoginRequestDto request) {
		CommonResponseDto fResponse = CommonResponseDto.builder().statusCode(400).build();
		User user = userService.getUserByEmail(request.getUserEmail());

		// 아이디 존재하지 않음
		if (user == null) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "does not exist email"));
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
