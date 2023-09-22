package com.ssafy.newsum.domain.users.controller;

import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.users.dto.request.TechRequestDto;
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
    public ResponseEntity updateTech(@PathVariable Integer userId, @RequestBody List<TechRequestDto> techRequestDto) {

        List<TechResponseDto> resultList = myPageService.updateTech(userId, techRequestDto);

        if (resultList == null)
            return ResponseEntity.ok(CommonResponseDto.error(400, "update tech fail"));

        return ResponseEntity.ok(CommonResponseDto.success(200, "update tech success", resultList));

    }

    // 최근 본 뉴스 조회
    @GetMapping("/mynews/{userId}")
    public ResponseEntity selectByMyNews(@PathVariable Integer userId) {

        List<NewsResponseDto> resultList = myPageService.selectByMyNews(userId);

        if (resultList == null)
            return ResponseEntity.ok(CommonResponseDto.error(400, "news list fail"));

        return ResponseEntity.ok(CommonResponseDto.success(200, "news list success", resultList));
    }


}
