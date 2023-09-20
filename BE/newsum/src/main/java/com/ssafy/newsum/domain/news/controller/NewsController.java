package com.ssafy.newsum.domain.news.controller;


import com.ssafy.newsum.domain.news.dto.request.NewsRequestDto;
import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.news.service.NewsService;
import com.ssafy.newsum.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/news")
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    // 추천 리스트 조회
    @GetMapping("/recommend/{userId}")
    public ResponseEntity selectRecommend(@PathVariable Integer userId) {

        List<NewsResponseDto> resultList = newsService.selectRecommend(userId);

        if (resultList == null)
            return ResponseEntity.ok(CommonResponseDto.error(500, "recommendList error"));

        return ResponseEntity.ok(CommonResponseDto.success(200, resultList));
    }

    // 분야별 조회
    @GetMapping("/{userId}/{categoryId}")
    public ResponseEntity selectByCategory(@PathVariable Integer userId, @PathVariable Integer categoryId) {

        List<NewsResponseDto> resultList = newsService.selectByCategory(userId, categoryId);

        if (resultList == null)
            return ResponseEntity.ok(CommonResponseDto.error(500, "categoryList error"));

        return ResponseEntity.ok(CommonResponseDto.success(200, resultList));
    }

    // 인기도순 최신순으로 분야별 조회
    @GetMapping("/{userId}/sort")
    public ResponseEntity selectCategoryByOption(@PathVariable Integer userId,
                                                 @RequestParam(name = "category") Integer categoryId,
                                                 @RequestParam(name = "option") Integer optionId) {

        List<NewsResponseDto> resultList = newsService.selectCategoryByOption(userId, categoryId, optionId);

        if (resultList == null)
            return ResponseEntity.ok(CommonResponseDto.error(500, "sortList error"));

        return ResponseEntity.ok(CommonResponseDto.success(200, resultList));
    }

    // 뉴스 상세보기
    @PostMapping("/detail")
    public ResponseEntity selectNewsDetail(@RequestBody NewsRequestDto newsRequestDto) {

        System.out.println(newsRequestDto);

        System.out.println("여기 들어와??");

        newsService.selectNewsDetail(newsRequestDto);

        return ResponseEntity.ok(CommonResponseDto.success(200, "detail success"));
    }

    // 뉴스 검색하기
    @GetMapping("/{userId}/search")
    public ResponseEntity searchNews(@PathVariable Integer userId, @RequestParam String keyword) {

        List<NewsResponseDto> resultList = newsService.searchNews(keyword, userId);

        if (resultList == null)
            return ResponseEntity.ok(CommonResponseDto.error(500, "search error"));

        return ResponseEntity.ok(CommonResponseDto.success(200, resultList));

    }


}