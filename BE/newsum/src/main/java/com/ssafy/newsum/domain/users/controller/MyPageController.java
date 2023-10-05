package com.ssafy.newsum.domain.users.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.job.dto.response.JobCntDto;
import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.users.dto.response.AnalyzeResultResponseDto;
import com.ssafy.newsum.domain.users.dto.response.CategoryDto;
import com.ssafy.newsum.domain.users.dto.response.CategoryListDto;
import com.ssafy.newsum.domain.users.dto.response.HeadlineResponseDto;
import com.ssafy.newsum.domain.users.dto.response.Keywords;
import com.ssafy.newsum.domain.users.dto.response.TechResponseDto;
import com.ssafy.newsum.domain.users.dto.response.UserInfoDto;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.service.MyPageService;
import com.ssafy.newsum.domain.users.service.UserService;
import com.ssafy.newsum.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

	private final MyPageService myPageService;
	private final UserService userService;

	// 회원 정보 조회
	@GetMapping("/{userId}")
	public ResponseEntity<CommonResponseDto<?>> getUserInfo(Authentication authentication,
		@PathVariable Integer userId) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail select info"));
		}

		User user = userService.getUserById(userId);
		List<TechStack> techStackList = userService.getTechStackByUser(userId);
		List<Headline> headlineList = userService.getHeadlineByUser(user);
		List<TechResponseDto> techStackResponseDtoList = new ArrayList<>();
		List<HeadlineResponseDto> headlineResponseDtoList = new ArrayList<>();

		for (TechStack techStack : techStackList) {
			TechResponseDto techStackResponseDto = TechResponseDto.builder()
				.id(techStack.getTsId())
				.name(techStack.getTsName())
				.build();
			techStackResponseDtoList.add(techStackResponseDto);
		}

		for (Headline headline : headlineList) {
			HeadlineResponseDto headlineResponseDto = HeadlineResponseDto.builder()
				.id(headline.getHlId())
				.name(headline.getHlName())
				.build();
			headlineResponseDtoList.add(headlineResponseDto);
		}

		UserInfoDto userInfoDto = UserInfoDto.builder()
			.id(userId)
			.email(user.getEmail())
			.name(user.getName())
			.birthDate(user.getBirthDate())
			.tech(techStackResponseDtoList)
			.headline(headlineResponseDtoList)
			.build();

		return ResponseEntity.ok(CommonResponseDto.success(200, "success find userInfo", userInfoDto));
	}

	// 기술 스택 수정
	@PatchMapping("/tech/{userId}")
	public ResponseEntity updateTech(@PathVariable Integer userId, @RequestBody List<Integer> techList) {

		List<TechResponseDto> resultList = myPageService.updateTech(userId, techList);

		if (resultList == null)
			return ResponseEntity.ok(CommonResponseDto.error(400, "update tech fail"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "update tech success", null));

	}

	// 최근 본 뉴스 조회 읽은뉴스 순
	@GetMapping("/mynews/{userId}")
	public ResponseEntity selectByMyNews(Authentication authentication, @PathVariable Integer userId,
		@RequestParam Integer page) {

		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail select news list"));
		}

		Pageable pageable = PageRequest.of(page, 30);

		List<NewsResponseDto> resultList = myPageService.selectByMyNews(userId, pageable);

		if (resultList == null)
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail select news list"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "news list success", resultList));
	}

	// 스크랩 카테고리별 뉴스 스크랩순
	@GetMapping("/myscrapnews/{userId}/{categoryId}")
	public ResponseEntity selectMyScrapByCategoryId(Authentication authentication, @PathVariable Integer userId,
		@PathVariable Integer categoryId,
		@RequestParam Integer page) {

		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail scrap category"));
		}

		Pageable pageable = PageRequest.of(page, 30);

		List<NewsResponseDto> resultList = myPageService.selectMyScrapByCategoryId(userId, categoryId, pageable);

		if (resultList == null)
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail scrap category"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "scrap category success", resultList));

	}

	// 스크랩 인기도순 최신순
	@GetMapping("/myscrap/{userId}/sort")
	public ResponseEntity selectScrapNewsSortByOption(Authentication authentication, @PathVariable Integer userId,
		@RequestParam(name = "categoryId") Integer categoryId,
		@RequestParam(name = "optionId") Integer optionId,
		@RequestParam Integer page) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail scrap option"));
		}

		Pageable pageable = PageRequest.of(page, 30);

		List<NewsResponseDto> resultList = myPageService.selectScrapNewsSortByOption(userId, categoryId, optionId,
			pageable);

		if (resultList == null)
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail scrap option"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "scrap option success", resultList));

	}

	// 분석 결과 조회
	@GetMapping("/analyze/{userId}")
	public ResponseEntity<CommonResponseDto<?>> selectByAnalyze(Authentication authentication,
		@PathVariable Integer userId) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.ok(CommonResponseDto.error(400, "fail select analyze result"));
		}

		//1. 키워드 분석 결과 조회
		List<Keywords> keywordsList = myPageService.getKeywords(userId);

		//2-1. 읽은 목록 카테고리 조회
		List<CategoryDto> readCategoryList = myPageService.selectCategoryByReadNews(userId);
		//2-2. 스크랩 목록 카테고리 조회
		List<CategoryDto> scrapCategoryList = myPageService.selectCategoryByScrap(userId);
		CategoryListDto categoryList = CategoryListDto.builder()
			.read(readCategoryList)
			.scrap(scrapCategoryList)
			.build();

		//3. 비슷한 직업 유형 출력
		List<JobCntDto> jobList = myPageService.selectJobsByReadNews(userId);

		//4. 응답 dto 생성
		AnalyzeResultResponseDto analyzeResultResponseDto = AnalyzeResultResponseDto.builder()
			.keywordlist(keywordsList)
			.readList(categoryList)
			.jobList(jobList)
			.build();

		return ResponseEntity.ok(
			CommonResponseDto.success(200, "success select analyze result", analyzeResultResponseDto));
	}
}
