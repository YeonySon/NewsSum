package com.ssafy.newsum.domain.users.controller;


import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.users.service.UserService;
import com.ssafy.newsum.global.common.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    //헤드라인 리스트 출력
    @GetMapping("/headline")
    public ResponseEntity getHeadlineList() {
        List<Headline> headlineList = userService.getAllHeadline();

        return ResponseEntity.ok(CommonResponseDto.builder().statusCode(200).message("SUCCESS"));
    }

    //기술스택 리스트 출력
    @GetMapping("/techstack")
    public ResponseEntity getTechStackList() {
        List<TechStack> techStackList = userService.getAllTechStack();

        return ResponseEntity.ok(CommonResponseDto.builder().statusCode(200).message("SUCCESS"));
    }

    //회원 가입
    // @PostMapping
    // public ResponseEntity signup() {
    //
    // }

    //회원 정보 수정
    // @PatchMapping("/{userId}")
    // public ResponseEntity updateUserInfo(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
    //
    // }

    //회원 탈퇴
    @DeleteMapping
    public ResponseEntity withdrawl(Authentication authentication) {
        return ResponseEntity.ok(CommonResponseDto.success(200, "success delete user"));
    }

}
