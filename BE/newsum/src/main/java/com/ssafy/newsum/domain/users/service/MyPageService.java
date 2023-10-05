package com.ssafy.newsum.domain.users.service;

import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.news.entity.News;
import com.ssafy.newsum.domain.news.repository.NewsRepository;
import com.ssafy.newsum.domain.news.service.NewsService;
import com.ssafy.newsum.domain.readnews.repository.ReadNewsRepository;
import com.ssafy.newsum.domain.techstack.entity.PreferredTechStack;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.techstack.repository.PreferredTechStackRepository;
import com.ssafy.newsum.domain.techstack.repository.TechStackRepository;
import com.ssafy.newsum.domain.users.dto.response.TechResponseDto;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public List<TechResponseDto> updateTech(Integer userId, List<Integer> techList) {

        System.out.println("여기까지 와?");
        // uesrid에 맞는 선호기술 스택 가져오기
        List<PreferredTechStack> result = preferredTechStackRepository.findByUserId(userId);
        System.out.println("여기는?");

        List<TechResponseDto> resultList = new ArrayList<>();

        // 기존에 있는 선호기술 스택 지우기
        for (PreferredTechStack pf : result) {
            preferredTechStackRepository.delete(pf);
        }

        // 유저 정보 가져오기
        User user = userRepository.findUserByUserId(userId);

        // 새롭게 받은 기술 스택 저장하기
        for (Integer tr : techList) {

            Optional<TechStack> techStack = techStackRepository.findById(tr);

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
    public List<NewsResponseDto> selectByMyNews(Integer userId, Pageable pageable) {

        // 해당 user가 읽은목록에서 뉴스id 값 가져와서 뉴스 테이블에서 조회해서 가져옴
        Page<News> newsList = newsRepository.selectAllMyReadNews(userId, pageable);

        int currentPage = newsList.getNumber();
        int totalPages = newsList.getTotalPages();

        if (totalPages >= currentPage) {
            Page<News> lastPage = newsRepository.selectAllMyReadNews(userId, PageRequest.of(totalPages - 1, pageable.getPageSize()));
            newsList = lastPage;
        }

        List<NewsResponseDto> resultList = new ArrayList<>();

        // newsresponsedto 만드는 메소드 재활용
        List<NewsResponseDto> result = newsService.makeNewsResponseDto(newsList.getContent(), resultList, userId, totalPages);

        return result;
    }

    // 스크랩 뉴스 카테고리별 조회
    @Transactional
    public List<NewsResponseDto> selectMyScrapByCategoryId(Integer userId, Integer categoryId, Pageable pageable) {

        Page<News> newsList;

        // 전체 뉴스기사
        if (categoryId == 0) {
            newsList = newsRepository.selectAllMyScrapNews(userId, pageable);
        } else {
            // 카테고리별 뉴스기사
            newsList = newsRepository.selectMyScrapNewsByCategory(userId, categoryId, pageable);
        }

        int currentPage = newsList.getNumber();
        int totalPages = newsList.getTotalPages();

        if (currentPage >= totalPages) {
            Page<News> lastPage;
            // 전체 뉴스기사
            if (categoryId == 0) {
                lastPage = newsRepository.selectAllMyScrapNews(userId, pageable);
            } else {
                // 카테고리별 뉴스기사
                lastPage = newsRepository.selectMyScrapNewsByCategory(userId, categoryId, pageable);
            }
            newsList = lastPage;
        }

        List<NewsResponseDto> resultList = new ArrayList<>();

        List<NewsResponseDto> result = newsService.makeNewsResponseDto(newsList.getContent(), resultList, userId, totalPages);

        return result;
    }

    // 스크랩 뉴스 인기도순 최신순 정렬
    @Transactional
    public List<NewsResponseDto> selectScrapNewsSortByOption(Integer userId, Integer categoryId, Integer optionId, Pageable pageable) {

        List<NewsResponseDto> resultList = new ArrayList<>();
        Page<News> newsList;

        // 전체분야
        if (categoryId == 0) {

            // 인기도 순
            if (optionId == 1) {
                newsList = newsRepository.selectAllScrapPopular(userId, pageable);
            }
            // 최신 순
            else {
                newsList = newsRepository.selectAllMyScrapNews(userId, pageable);
            }
        }
        // 해당 분야별
        else {

            // 인기도순
            if (optionId == 1) {
                newsList = newsRepository.selectScrapCategoryByOption(userId, categoryId, pageable);
            }
            // 최신순
            else {
                newsList = newsRepository.selectMyScrapNewsByCategory(userId, categoryId, pageable);
            }
        }

        int currentPage = newsList.getNumber();
        int totalPages = newsList.getTotalPages();

        if (currentPage >= totalPages) {

            Page<News> lastPage;

            // 전체분야
            if (categoryId == 0) {

                // 인기도 순
                if (optionId == 1) {
                    lastPage = newsRepository.selectAllScrapPopular(userId, pageable);
                }
                // 최신 순
                else {
                    lastPage = newsRepository.selectAllMyScrapNews(userId, pageable);
                }
            }
            // 해당 분야별
            else {

                // 인기도순
                if (optionId == 1) {
                    lastPage = newsRepository.selectScrapCategoryByOption(userId, categoryId, pageable);
                }
                // 최신순
                else {
                    lastPage = newsRepository.selectMyScrapNewsByCategory(userId, categoryId, pageable);
                }
            }

            newsList = lastPage;
        }


        List<NewsResponseDto> result = newsService.makeNewsResponseDto(newsList.getContent(), resultList, userId, totalPages);

        return result;
    }

}
