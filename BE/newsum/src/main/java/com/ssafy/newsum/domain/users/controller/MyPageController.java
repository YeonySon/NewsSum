package com.ssafy.newsum.domain.users.controller;

import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.users.dto.response.TechResponseDto;
import com.ssafy.newsum.domain.users.service.MyPageService;
import com.ssafy.newsum.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


}
