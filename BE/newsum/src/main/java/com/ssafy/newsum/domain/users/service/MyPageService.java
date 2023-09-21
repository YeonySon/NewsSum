package com.ssafy.newsum.domain.users.service;

import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.techstack.repository.TechStackRepository;
import com.ssafy.newsum.domain.users.dto.request.TechRequestDto;
import com.ssafy.newsum.domain.users.dto.response.TechResponseDto;
import com.ssafy.newsum.domain.users.entity.PreferredTechStack;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.PreferredTechStackRepository;
import com.ssafy.newsum.domain.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final UserRepository userRepository;
    private final PreferredTechStackRepository preferredTechStackRepository;
    private final TechStackRepository techStackRepository;


    // 기술스택 수정
    @Transactional
    public List<TechResponseDto> updateTech(Integer userId, List<TechRequestDto> techRequestDto) {

        // uesrid에 맞는 선호기술 스택 가져오기
        List<PreferredTechStack> result = preferredTechStackRepository.findByUserId(userId);

        List<TechResponseDto> resultList = new ArrayList<>();

        // 기존에 있는 선호기술 스택 지우기
        for (PreferredTechStack pf : result) {
            preferredTechStackRepository.delete(pf);
        }

        // 유저 정보 가져오기
        User user = userRepository.findUserByUserId(userId);

        // 새롭게 받은 기술 스택 저장하기
        for (TechRequestDto tr : techRequestDto) {

            Optional<TechStack> techStack = techStackRepository.findById(tr.getTechId());

            PreferredTechStack preferStack = PreferredTechStack.builder()
                    .user(user)
                    .techStack(techStack.get())
                    .build();

            // 저장
            preferredTechStackRepository.save(preferStack);

            // responsedto에 넣어주기
            TechResponseDto techResponseDto = TechResponseDto.builder()
                    .id(techStack.get().getTsId())
                    .name(techStack.get().getTsName())
                    .build();

            resultList.add(techResponseDto);
        }

        return resultList;
    }


}
