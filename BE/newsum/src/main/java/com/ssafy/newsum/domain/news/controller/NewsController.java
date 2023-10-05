package com.ssafy.newsum.domain.news.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.newsum.domain.news.dto.request.NewsRequestDto;
import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.news.service.NewsService;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.service.UserService;
import com.ssafy.newsum.global.common.CommonResponseDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
@Slf4j
public class NewsController {
	private final UserService userService;
	private final NewsService newsService;

	// 추천 리스트 조회
	@GetMapping("/recommend/{userId}")
	public ResponseEntity selectRecommend(Authentication authentication, @PathVariable Integer userId) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.badRequest().body(CommonResponseDto.error(400, "recommendList error"));
		}

		List<NewsResponseDto> resultList = newsService.selectRecommend(userId);

		if (resultList == null)
			return ResponseEntity.badRequest().body(CommonResponseDto.error(500, "recommendList error"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "recommendList success", resultList));
	}

	// 분야별 조회
	@GetMapping("/{userId}/{categoryId}")
	public ResponseEntity selectByCategory(@PathVariable Integer userId, @PathVariable Integer categoryId) {

		List<NewsResponseDto> resultList = newsService.selectByCategory(userId, categoryId);

		if (resultList == null)
			return ResponseEntity.badRequest().body(CommonResponseDto.error(500, "categoryList error"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "categoryList success", resultList));
	}

	// 인기도순 최신순으로 분야별 조회
	@GetMapping("/{userId}/sort")
	public ResponseEntity selectCategoryByOption(@PathVariable Integer userId,
		@RequestParam(name = "category") Integer categoryId,
		@RequestParam(name = "option") Integer optionId) {

		List<NewsResponseDto> resultList = newsService.selectCategoryByOption(userId, categoryId, optionId);

		if (resultList == null)
			return ResponseEntity.badRequest().body(CommonResponseDto.error(500, "sortList error"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "sortList success", resultList));
	}

	// 뉴스 상세보기
	@PostMapping("/detail")
	public ResponseEntity selectNewsDetail(@RequestBody NewsRequestDto newsRequestDto) {

		newsService.selectNewsDetail(newsRequestDto);

		return ResponseEntity.ok(CommonResponseDto.success(200, "detail success", null));
	}

	// 뉴스 검색하기
	@GetMapping("/{userId}/search")
	public ResponseEntity searchNews(@PathVariable Integer userId, @RequestParam String keyword) {

		List<NewsResponseDto> resultList = newsService.searchNews(keyword, userId);

		if (resultList == null)
			return ResponseEntity.badRequest().body(CommonResponseDto.error(500, "search error"));

		return ResponseEntity.ok(CommonResponseDto.success(200, "search success", resultList));

	}

	// 뉴스 좋아요
	@GetMapping("/dibs/{newsId}/{userId}")
	public ResponseEntity likeNews(Authentication authentication, @PathVariable Integer newsId,
		@PathVariable Integer userId) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.badRequest().body(CommonResponseDto.error(400, "like error"));
		}

		newsService.likeNews(newsId, userId);

		return ResponseEntity.ok(CommonResponseDto.success(200, "like success", null));

	}

	// 뉴스 좋아요 취소
	@DeleteMapping("/dibs/{newsId}/{userId}")
	public ResponseEntity likeNewsCancel(Authentication authentication, @PathVariable Integer newsId,
		@PathVariable Integer userId) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.badRequest().body(CommonResponseDto.error(400, "like cancel error"));
		}

		newsService.likeNewsCancel(newsId, userId);

		return ResponseEntity.ok(CommonResponseDto.success(200, "like cancel success", null));
	}

	// 뉴스 스크랩
	@GetMapping("/scrap/{newsId}/{userId}")
	public ResponseEntity scrapNews(Authentication authentication, @PathVariable Integer newsId,
		@PathVariable Integer userId) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.badRequest().body(CommonResponseDto.error(400, "scrap success"));
		}

		newsService.scrapNews(newsId, userId);

		return ResponseEntity.ok(CommonResponseDto.success(200, "scrap success", null));
	}

	// 뉴스 스크랩 취소
	@DeleteMapping("/scrap/{newsId}/{userId}")
	public ResponseEntity scrapNewsCancel(Authentication authentication, @PathVariable Integer newsId,
		@PathVariable Integer userId) {
		User authUser = userService.getUserByEmail(authentication.getName()).get();

		if (authUser.getUserId() != userId) {
			return ResponseEntity.badRequest().body(CommonResponseDto.error(400, "crap cancel error"));
		}

		newsService.scrapNewsCancel(newsId, userId);

		return ResponseEntity.ok(CommonResponseDto.success(200, "scrap cancel success", null));
	}
}
