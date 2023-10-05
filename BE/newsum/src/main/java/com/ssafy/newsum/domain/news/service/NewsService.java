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
import com.ssafy.newsum.domain.recommendnews.repository.RecommendnewsRepository;
import com.ssafy.newsum.domain.scrap.entity.Scrap;
import com.ssafy.newsum.domain.scrap.repository.ScrapRepository;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    private final RecommendnewsRepository recommendnewsRepository;

    //숏츠 : 뉴스 조회수 증가 + 읽은 목록 추가
    @Transactional
    public void updateShortsNews(News news, User user) {
        newsRepository.updateViewCnt(news.getNewsId());
        Optional<ReadNews> readNewsObject = readListRepository.findReadByUserId(news.getNewsId(), user.getUserId());

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

        // 100개만 가져오기
        Pageable pageable = PageRequest.of(0, 100);

        List<Tuple> resultList = newsRepository.selectRecommend(userId, pageable);

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
    public List<NewsResponseDto> selectByCategory(Integer userId, Integer categoryId, Pageable pageable) {

        Page<News> newsList = null;
        // 전체 뉴스기사
        if (categoryId == 0) {
            newsList = newsRepository.selectAllByRecent(pageable);
        } else {
            // 카테고리별 뉴스기사
            newsList = newsRepository.selectByCategory(categoryId, pageable);
        }

        List<NewsResponseDto> resultList = new ArrayList<>();

        int currentPage = newsList.getNumber();

        int totalPages = newsList.getTotalPages();

        // 요청하는 페이지가 마지막 페이지보다 높을 경우
        if (currentPage >= totalPages) {
            // 마지막 페이지의 내용을 반환
            Page<News> lastPage;

            if (totalPages != 0)
                totalPages -= 1;

            if (categoryId == 0) {
                lastPage = newsRepository.selectAllByRecent(PageRequest.of(totalPages, pageable.getPageSize()));
            } else {
                lastPage = newsRepository.selectByCategory(categoryId,
                        PageRequest.of(totalPages, pageable.getPageSize()));
            }
            newsList = lastPage;
        }

        List<NewsResponseDto> result = makeNewsResponseDto(newsList.getContent(), resultList, userId, totalPages);

        return result;

    }

    // 조건 정렬
    // 인기도순 최신순
    @Transactional
    public List<NewsResponseDto> selectCategoryByOption(Integer userId, Integer categoryId, Integer optionId,
                                                        Pageable pageable) {

        List<NewsResponseDto> resultList = new ArrayList<>();
        Page<News> newsList = null;

        // 전체분야
        if (categoryId == 0) {

            // 인기도 ttttttttaaafffffaa순
            if (optionId == 1) {
                newsList = newsRepository.selectAllPopular(pageable);
            }
            // 최신 순
            else {
                newsList = newsRepository.selectAllByRecent(pageable);
            }
        }
        // 해당 분야별
        else {

            // 인기도순
            if (optionId == 1) {
                newsList = newsRepository.selectPopularByCategory(categoryId, pageable);
            }
            // 최신순
            else {
                newsList = newsRepository.selectByCategory(categoryId, pageable);
            }
        }

        int currentPage = newsList.getNumber();
        int totalPages = newsList.getTotalPages();

        if (currentPage >= totalPages) {

            Page<News> lastPage;
            // 전체분야

            if (totalPages != 0)
                totalPages -= 1;


            if (categoryId == 0) {

                // 인기도순
                if (optionId == 1) {
                    lastPage = newsRepository.selectAllPopular(PageRequest.of(totalPages, pageable.getPageSize()));
                }
                // 최신 순
                else {
                    lastPage = newsRepository.selectAllByRecent(PageRequest.of(totalPages, pageable.getPageSize()));
                }
            }
            // 해당 분야별
            else {

                // 인기도순
                if (optionId == 1) {
                    lastPage = newsRepository.selectPopularByCategory(categoryId,
                            PageRequest.of(totalPages, pageable.getPageSize()));
                }
                // 최신순
                else {
                    lastPage = newsRepository.selectByCategory(categoryId,
                            PageRequest.of(totalPages, pageable.getPageSize()));
                }
            }
            newsList = lastPage;
        }

        List<NewsResponseDto> result = makeNewsResponseDto(newsList.getContent(), resultList, userId, totalPages);

        return result;
    }

    // 뉴스 상세보기
    // 나의 최근 본 뉴스에 포함
    // 조회수 증가
    @Transactional
    public void selectNewsDetail(NewsRequestDto newsRequestDto) {

        // 조회수 증가
        newsRepository.updateViewCnt(newsRequestDto.getNewsId());

        // 회원일때만
        if (newsRequestDto.getUserId() != 0) {

            // 추천탭에서 상세보기를 눌렀을 때
            // 추천 테이블에서 해당 뉴스기사 읽음 처리
            if (newsRequestDto.getIsRecom().equals("t")) {
                recommendnewsRepository.updateRecommendIsRead(newsRequestDto.getNewsId(), newsRequestDto.getUserId());
            }

            // 나의 최근 본 뉴스에 추가
            Optional<ReadNews> readNews = readListRepository.findReadByUserId(newsRequestDto.getNewsId(),
                    newsRequestDto.getUserId());

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
    }

    // 검색하기
    @Transactional
    public List<NewsResponseDto> searchNews(String keyword, Integer userId, Pageable pageable) {

        Page<News> newsList = newsRepository.searchNews(keyword, pageable);

        int currentPage = newsList.getNumber();
        int totalPages = newsList.getTotalPages();

        if (currentPage >= totalPages) {
            Page<News> lastPage;

            if (totalPages != 0)
                totalPages -= 1;

            lastPage = newsRepository.searchNews(keyword, PageRequest.of(totalPages, pageable.getPageSize()));

            newsList = lastPage;
        }

        List<NewsResponseDto> resultList = new ArrayList<>();

        List<NewsResponseDto> result = makeNewsResponseDto(newsList.getContent(), resultList, userId, totalPages);

        return result;
    }

    // newsresponsedto 만드는 메소드
    public List<NewsResponseDto> makeNewsResponseDto(List<News> newsList, List<NewsResponseDto> resultList,
                                                     Integer userId, Integer totalPages) {
        // 해당 카테고리에 맞는 뉴스기사 전체 가져와서
        // 각 뉴스에 있는 카테고리 id 값이랑 media id 값 가지고
        // CategoryRepository와 MediaRepository를 활용하여 responsedto맞는 타입 맞춰서 넣어준다
        for (News ns : newsList) {

            // 언론사 정보
            Optional<Media> mediaInfo = mediaRepository.findById(ns.getMediaId().getMediaId());

            // 카테고리 정보
            Optional<Category> cgInfo = categoryRepository.findById(ns.getCgId().getCategoryId());

            Boolean isLiked = false;
            Boolean isScrap = false;

            // 회원일 때만
            if (userId != 0) {

                // 해당기사 해당 유저가 좋아요 유무
                isLiked = dibsRepository.isLiked(userId, ns.getNewsId());

                // 해당기사 해당 유저가 스크랩 유무
                isScrap = scrapRepository.isScrap(userId, ns.getNewsId());
            }

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
                    .totalPages(totalPages)
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
