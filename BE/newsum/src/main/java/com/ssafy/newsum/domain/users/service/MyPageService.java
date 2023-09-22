package com.ssafy.newsum.domain.users.service;

import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.news.entity.News;
import com.ssafy.newsum.domain.news.repository.NewsRepository;
import com.ssafy.newsum.domain.news.service.NewsService;
import com.ssafy.newsum.domain.readnews.repository.ReadNewsRepository;
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
    private final NewsRepository newsRepository;
    private ReadNewsRepository readNewsRepository;
    private final NewsService newsService;


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

    // 최근 본 뉴스 가져오기
    @Transactional
    public List<NewsResponseDto> selectByMyNews(Integer userId) {

        // 해당 user가 읽은목록에서 뉴스id 값 가져와서 뉴스 테이블에서 조회해서 가져옴
        List<News> newsList = newsRepository.selectAllMyReadNews(userId);
        List<NewsResponseDto> resultList = new ArrayList<>();

        // newsresponsedto 만드는 메소드 재활용
        List<NewsResponseDto> result = newsService.makeNewsResponseDto(newsList, resultList, userId);

        return result;
    }

    // 스크랩 뉴스 카테고리별 조회
    @Transactional
    public List<NewsResponseDto> selectMyScrapByCategoryId(Integer userId, Integer categoryId) {

        List<News> newsList = new ArrayList<>();

        // 전체 뉴스기사
        if (categoryId == 0) {
            newsList = newsRepository.selectAllMyScrapNews(userId);
        } else {
            // 카테고리별 뉴스기사
            newsList = newsRepository.selectMyScrapNewsByOption(userId, categoryId);
        }

        List<NewsResponseDto> resultList = new ArrayList<>();

        List<NewsResponseDto> result = newsService.makeNewsResponseDto(newsList, resultList, userId);

        return result;
    }


}
