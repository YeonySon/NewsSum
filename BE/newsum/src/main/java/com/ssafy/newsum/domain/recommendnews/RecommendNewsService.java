package com.ssafy.newsum.domain.recommendnews;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.newsum.domain.news.entity.News;
import com.ssafy.newsum.domain.readnews.ReadNewsRepository;
import com.ssafy.newsum.domain.readnews.entity.ReadNews;
import com.ssafy.newsum.domain.users.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RecommendNewsService {
	private final RecommendNewsRepository recommendNewsRepository;
	private final ReadNewsRepository readListRepository;

	//숏츠 : 뉴스 조회수 증가 + 읽은 목록 추가
	@Transactional
	public void updateShortsNews(News news, User user) {
		recommendNewsRepository.updateViewCnt(news.getId());
		Optional readNewsObject = readListRepository.findByUserId(news.getId(), user.getUserId());

		//이미 읽은 기사라면 날짜 갱신
		if (readNewsObject.isPresent()) {
			readListRepository.save((ReadNews)readNewsObject.get());
			return;
		}

		//읽지 않은 기사 저장
		ReadNews readNews = ReadNews.builder()
			.type('n')
			.contentId(news.getId())
			.user(user)
			.build();
		readListRepository.save(readNews);
	}

}
