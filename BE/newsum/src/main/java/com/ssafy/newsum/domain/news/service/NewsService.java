package com.ssafy.newsum.domain.news.service;


import com.ssafy.newsum.domain.dibs.entity.Dibs;
import com.ssafy.newsum.domain.dibs.repository.DibsRepository;
import com.ssafy.newsum.domain.news.dto.request.NewsRequestDto;
import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.news.entity.Category;
import com.ssafy.newsum.domain.news.entity.Media;
import com.ssafy.newsum.domain.news.entity.News;
import com.ssafy.newsum.domain.news.repository.CategoryRepository;
import com.ssafy.newsum.domain.news.repository.MediaRepository;
import com.ssafy.newsum.domain.news.repository.NewsRepository;
import com.ssafy.newsum.domain.readnews.entity.ReadNews;
import com.ssafy.newsum.domain.readnews.repository.ReadNewsRepository;
import com.ssafy.newsum.domain.scrap.entity.Scrap;
import com.ssafy.newsum.domain.scrap.repository.ScrapRepository;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Tuple;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsService {


    private final NewsRepository newsRepository;
    private final ReadNewsRepository readListRepository;
    private final DibsRepository dibsRepository;
    private final ScrapRepository scrapRepository;
    private final MediaRepository mediaRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;


    //숏츠 : 뉴스 조회수 증가 + 읽은 목록 추가
    @Transactional
    public void updateShortsNews(News news, User user) {
        newsRepository.updateViewCnt(news.getNewsId());
        Optional<ReadNews> readNewsObject = readListRepository.findByUserId(news.getNewsId(), user.getUserId());

        //이미 읽은 기사라면 날짜 갱신
        if (readNewsObject.isPresent()) {
            readListRepository.save(readNewsObject.get());
            return;
        }

        //읽지 않은 기사 저장
        ReadNews readNews = ReadNews.builder()
                .type('n')
                .contentId(news.getNewsId())
                .user(user)
                .build();
        readListRepository.save(readNews);
    }


    // 추천 뉴스 리스트 조회
    @Transactional
    public List<NewsResponseDto> selectRecommend(Integer userId) {

        List<Tuple> resultList = newsRepository.selectRecommend(userId);

        List<NewsResponseDto> list = new ArrayList<>();

        for (Tuple nl : resultList) {


            News news = nl.get(0, News.class); // 뉴스
            Media media = nl.get(1, Media.class); // 언론
            Category category = nl.get(2, Category.class); // 분야

            // 해당 사용자가 해당 뉴스기사를 좋아요를 했는지 안 했는지 판단
            Boolean isLike = dibsRepository.isLiked(userId, news.getNewsId());

            // 해당 사용자가 해당 뉴스기사를 스크랩 했는지 안 했는지 판단
            Boolean isScrap = scrapRepository.isScrap(userId, news.getNewsId());

            // responsedto에 알맞은 값 넣어주기
            NewsResponseDto newsResDto = NewsResponseDto.builder()
                    .id(news.getNewsId())
                    .head(news.getHead())
                    .main(news.getMain())
                    .threeLine(news.getThreeLine())
                    .url(news.getUrl())
                    .postedDate(news.getPostedDate())
                    .mediaName(media.getName())
                    .mediaImage(media.getLogo())
                    .image(news.getImage())
                    .viewCnt(news.getViewCnt())
                    .likeCnt(news.getTotalLike())
                    .scrapCnt(news.getTotalScrap())
                    .cgName(category.getName())
                    .isLike(isLike ? "t" : "f")
                    .isScrap(isScrap ? "t" : "f").build();

            list.add(newsResDto);
        }
        return list;
    }


    // 뉴스 카테코리별 리스트
    @Transactional
    public List<NewsResponseDto> selectByCategory(Integer userId, Integer categoryId) {

        List<News> newsList = new ArrayList<>();

        // 전체 뉴스기사
        if (categoryId.equals(0)) {
            newsList = newsRepository.selectAllByRecent();
        } else {
            // 카테고리별 뉴스기사
            newsList = newsRepository.selectByCategory(categoryId);
        }

        List<NewsResponseDto> resultList = new ArrayList<>();

        List<NewsResponseDto> result = makeNewsResponseDto(newsList, resultList, userId);

        return result;

    }


    // 조건 정렬
    // 인기도순 최신순
    @Transactional
    public List<NewsResponseDto> selectCategoryByOption(Integer userId, Integer categoryId, Integer optionId) {

        List<NewsResponseDto> resultList = new ArrayList<>();
        List<News> newsList = new ArrayList<>();

        // 전체분야
        if (categoryId.equals(0)) {

            // 인기도 ttttttttaaafffffaa순
            if (optionId.equals(1)) {
                newsList = newsRepository.selectAllPopular();
            }
            // 최신 순
            else {
                newsList = newsRepository.selectAllByRecent();
            }
        }
        // 해당 분야별
        else {

            // 인기도순
            if (optionId.equals(1)) {
                newsList = newsRepository.selectPopularByCategory(categoryId);
            }
            // 최신순
            else {
                newsList = newsRepository.selectByCategory(categoryId);
            }
        }

        List<NewsResponseDto> result = makeNewsResponseDto(newsList, resultList, userId);

        return result;
    }

    // 뉴스 상세보기
    // 나의 최근 본 뉴스에 포함
    // 조회수 증가
    @Transactional
    public void selectNewsDetail(NewsRequestDto newsRequestDto) {

        // 조회수 증가
        newsRepository.updateViewCnt(newsRequestDto.getNewsId());

        // 나의 최근 본 뉴스에 추가
        Optional<ReadNews> readNews = readListRepository.findByUserId(newsRequestDto.getNewsId(), newsRequestDto.getUserId());

        // 이미 읽은 기사면 날짜 갱신
        if (readNews.isPresent()) {
            readNews.get().updateReadDt();
            readListRepository.save(readNews.get());
            return;
        }

        // user 찾기
        User userByUserId = userRepository.findUserByUserId(newsRequestDto.getUserId());


        // 읽지 않았다면 최근 본 뉴스에 추가
        ReadNews myReadNews = ReadNews.builder()
                .type('n')
                .contentId(newsRequestDto.getNewsId())
                .user(userByUserId)
                .build();
        readListRepository.save(myReadNews);

    }


    // 검색하기
    @Transactional
    public List<NewsResponseDto> searchNews(String keyword, Integer userId) {

        List<News> newsList = newsRepository.searchNews(keyword);

        List<NewsResponseDto> resultList = new ArrayList<>();

        List<NewsResponseDto> result = makeNewsResponseDto(newsList, resultList, userId);

        return result;
    }


    // newsresponsedto 만드는 메소드
    public List<NewsResponseDto> makeNewsResponseDto(List<News> newsList, List<NewsResponseDto> resultList,
                                                     Integer userId) {
        // 해당 카테고리에 맞는 뉴스기사 전체 가져와서
        // 각 뉴스에 있는 카테고리 id 값이랑 media id 값 가지고
        // CategoryRepository와 MediaRepository를 활용하여 responsedto맞는 타입 맞춰서 넣어준다
        for (News ns : newsList) {

            // 언론사 정보
            Optional<Media> mediaInfo = mediaRepository.findById(ns.getMediaId().getMediaId());

            // 카테고리 정보
            Optional<Category> cgInfo = categoryRepository.findById(ns.getCgId().getCategoryId());

            // 해당기사 해당 유저가 좋아요 유무
            Boolean isLiked = dibsRepository.isLiked(userId, ns.getNewsId());

            // 해당기사 해당 유저가 스크랩 유무
            Boolean isScrap = scrapRepository.isScrap(userId, ns.getNewsId());


            NewsResponseDto newsResDto = NewsResponseDto.builder()
                    .id(ns.getNewsId())
                    .head(ns.getHead())
                    .main(ns.getMain())
                    .threeLine(ns.getThreeLine())
                    .url(ns.getUrl())
                    .postedDate(ns.getPostedDate())
                    .mediaName(mediaInfo.get().getName())
                    .mediaImage(mediaInfo.get().getLogo())
                    .image(ns.getImage())
                    .viewCnt(ns.getViewCnt())
                    .cgName(cgInfo.get().getName())
                    .likeCnt(ns.getTotalLike())
                    .scrapCnt(ns.getTotalScrap())
                    .isScrap(isScrap ? "t" : "f")
                    .isLike(isLiked ? "t" : "f")
                    .build();

            resultList.add(newsResDto);
        }
        return resultList;
    }

    // 뉴스기사 좋아요
    @Transactional
    public void likeNews(Integer newsId, Integer userId) {

        User user = userRepository.findUserByUserId(userId);

        Dibs dibs = Dibs.builder()
                .type('n')
                .contentId(newsId)
                .user(user)
                .build();

        dibsRepository.save(dibs);
    }

    // 뉴스기사 좋아요 취소
    @Transactional
    public void likeNewsCancel(Integer newsId, Integer userId) {

        Optional<Dibs> dibs = dibsRepository.selectDibs(newsId, userId);

        dibsRepository.delete(dibs.get());

    }

    // 뉴스기사 스크랩
    @Transactional
    public void scrapNews(Integer newsId, Integer userId) {

        User user = userRepository.findUserByUserId(userId);

        Scrap scrap = Scrap.builder()
                .type('n')
                .contentId(newsId)
                .user(user)
                .build();

        scrapRepository.save(scrap);
    }

    // 뉴스 스크랩 취소
    @Transactional
    public void scrapNewsCancel(Integer newsId, Integer userId) {

        Optional<Scrap> scrap = scrapRepository.selectScrap(newsId, userId);

        scrapRepository.delete(scrap.get());
    }

}
