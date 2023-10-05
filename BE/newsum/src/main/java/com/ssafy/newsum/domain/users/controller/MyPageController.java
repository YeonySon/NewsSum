package com.ssafy.newsum.domain.users.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.newsum.domain.job.dto.response.JobCntDto;
import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.users.dto.response.AnalyzeResultResponseDto;
import com.ssafy.newsum.domain.users.dto.response.CategoryDto;
import com.ssafy.newsum.domain.users.dto.response.CategoryListDto;
import com.ssafy.newsum.domain.users.dto.response.Keywords;
import com.ssafy.newsum.domain.users.dto.response.TechResponseDto;
import com.ssafy.newsum.domain.users.service.MyPageService;
import com.ssafy.newsum.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mypage")
@RequiredArgsConstructor
public class MyPageController {

	private final MyPageService myPageService;

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
	public ResponseEntity selectByMyNews(@PathVariable Integer userId) {

		List<NewsResponseDto> resultList = myPageService.selectByMyNews(userId);

		if (resultList == null)
			return ResponseEntity.ok(CommonResponseDto.error(400, "news list fail"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "news list success", resultList));
	}

	// 스크랩 카테고리별 뉴스 스크랩순
	@GetMapping("/myscrapnews/{userId}/{categoryId}")
	public ResponseEntity selectMyScrapByCategoryId(@PathVariable Integer userId, @PathVariable Integer categoryId) {

		List<NewsResponseDto> resultList = myPageService.selectMyScrapByCategoryId(userId, categoryId);

		if (resultList == null)
			return ResponseEntity.ok(CommonResponseDto.error(400, "scrap category fail"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "scrap category success", resultList));

	}

	// 스크랩 인기도순 최신순
	@GetMapping("/myscrap/{userId}/sort")
	public ResponseEntity selectScrapNewsSortByOption(@PathVariable Integer userId,
		@RequestParam(name = "categoryId") Integer categoryId,
		@RequestParam(name = "optionId") Integer optionId) {
		List<NewsResponseDto> resultList = myPageService.selectScrapNewsSortByOption(userId, categoryId, optionId);

		if (resultList == null)
			return ResponseEntity.ok(CommonResponseDto.error(400, "scrap option fail"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "scrap option success", resultList));

	}

	// 분석 결과 조회
	@GetMapping("/analyze/{userId}")
	public ResponseEntity<CommonResponseDto<?>> selectByAnalyze(@PathVariable Integer userId) {
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
