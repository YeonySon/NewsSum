package com.ssafy.newsum.domain.users.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.newsum.domain.job.Job;
import com.ssafy.newsum.domain.job.dto.response.JobCntDto;
import com.ssafy.newsum.domain.job.repository.JobRepository;
import com.ssafy.newsum.domain.news.dto.response.NewsResponseDto;
import com.ssafy.newsum.domain.news.entity.Category;
import com.ssafy.newsum.domain.news.entity.News;
import com.ssafy.newsum.domain.news.repository.CategoryRepository;
import com.ssafy.newsum.domain.news.repository.NewsRepository;
import com.ssafy.newsum.domain.news.service.NewsService;
import com.ssafy.newsum.domain.readnews.repository.ReadNewsRepository;
import com.ssafy.newsum.domain.techstack.entity.PreferredTechStack;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.techstack.repository.PreferredTechStackRepository;
import com.ssafy.newsum.domain.techstack.repository.TechStackRepository;
import com.ssafy.newsum.domain.users.dto.response.CategoryDto;
import com.ssafy.newsum.domain.users.dto.response.Keywords;
import com.ssafy.newsum.domain.users.dto.response.TechResponseDto;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class MyPageService {

	private final UserRepository userRepository;
	private final PreferredTechStackRepository preferredTechStackRepository;
	private final TechStackRepository techStackRepository;
	private final NewsRepository newsRepository;
	private ReadNewsRepository readNewsRepository;
	private final NewsService newsService;
	private final CategoryRepository categoryRepository;
	private final JobRepository jobRepository;

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
			newsList = newsRepository.selectMyScrapNewsByCategory(userId, categoryId);
		}

		List<NewsResponseDto> resultList = new ArrayList<>();

		List<NewsResponseDto> result = newsService.makeNewsResponseDto(newsList, resultList, userId);

		return result;
	}

	// 스크랩 뉴스 인기도순 최신순 정렬
	@Transactional
	public List<NewsResponseDto> selectScrapNewsSortByOption(Integer userId, Integer categoryId, Integer optionId) {

		List<NewsResponseDto> resultList = new ArrayList<>();
		List<News> newsList = new ArrayList<>();

		// 전체분야
		if (categoryId == 0) {

			// 인기도 순
			if (optionId == 1) {
				newsList = newsRepository.selectAllScrapPopular(userId);
			}
			// 최신 순
			else {
				newsList = newsRepository.selectAllMyScrapNews(userId);
			}
		}
		// 해당 분야별
		else {

			// 인기도순
			if (optionId == 1) {
				newsList = newsRepository.selectScrapCategoryByOption(userId, categoryId);
			}
			// 최신순
			else {
				newsList = newsRepository.selectMyScrapNewsByCategory(userId, categoryId);
			}
		}

		List<NewsResponseDto> result = newsService.makeNewsResponseDto(newsList, resultList, userId);

		return result;
	}

	// 키워드 분석 결과 조회
	public List<Keywords> getKeywords(Integer userId) {
		//1. 읽은 뉴스 형태소 컬럼 조회
		List<String> nouns = newsRepository.selectNounsByNews(userId);
		Map<String, Integer> nounsMap = new HashMap<>();
		//2. 해당 문자열 리스트로 생성(띄어쓰기 기준)
		for (int i = 0; i < nouns.size(); i++) {
			//3. counter 함수 사용
			String[] strList = nouns.get(i).split(" ");
			counter(strList, nounsMap);
		}

		List<Keywords> keywordsList = new ArrayList<>();
		List<String> keySet = new ArrayList<>(nounsMap.keySet());

		keySet.sort((o1, o2) -> nounsMap.get(o2).compareTo(nounsMap.get(o1)));

		for (int i = 0; i < 40; i++) {
			Keywords keywords = Keywords.builder()
				.name(keySet.get(i))
				.cnt(nounsMap.get(keySet.get(i)))
				.build();
			keywordsList.add(keywords);
		}

		return keywordsList;
	}

	//string 개수 count
	public void counter(String[] strList, Map<String, Integer> nounsMap) {
		for (String nouns : strList) {
			nounsMap.compute(nouns, (key, oldValue) -> oldValue == null ? 1 : oldValue + 1);
		}
	}

	// 읽은 목록 카테고리 조회
	public List<CategoryDto> selectCategoryByReadNews(Integer userId) {
		List<String[]> categoryList = newsRepository.selectCategoryByReadNews(userId);
		return getCategoryDtos(categoryList);
	}

	// 스크랩 목록 카테고리 조회
	public List<CategoryDto> selectCategoryByScrap(Integer userId) {
		List<String[]> categoryList = newsRepository.selectCategoryByScrap(userId);
		return getCategoryDtos(categoryList);
	}

	private List<CategoryDto> getCategoryDtos(List<String[]> categoryInfoList) {
		List<CategoryDto> categoryDtos = new ArrayList<>();
		//카테고리 조회
		List<Category> categoryList = categoryRepository.findAll();

		// 1. 목록에 없는 카테고리 조회(앞)
		int start = Integer.parseInt(categoryInfoList.get(0)[0]);
		int finish = Integer.parseInt(categoryInfoList.get(categoryInfoList.size() - 1)[0]) + 1;
		int categoryLen = categoryList.size();
		for (int i = 1; i < start; i++) {
			Category category = categoryList.get(i - 1);
			CategoryDto categoryDto = CategoryDto.builder()
				.categoryId(category.getCategoryId())
				.name(category.getName())
				.cnt(0)
				.build();

			categoryDtos.add(categoryDto);
		}

		//2. 목록에 있는 카테고리 조회
		for (String[] category : categoryInfoList) {
			CategoryDto categoryDto = CategoryDto.builder()
				.categoryId(Integer.parseInt(category[0]))
				.name(category[1])
				.cnt(Integer.parseInt(category[2]))
				.build();

			categoryDtos.add(categoryDto);
		}

		//3. 목록에 없는 카테고리 조회(뒤)
		for (int i = finish; i <= categoryLen; i++) {
			Category category = categoryList.get(i - 1);
			CategoryDto categoryDto = CategoryDto.builder()
				.categoryId(category.getCategoryId())
				.name(category.getName())
				.cnt(0)
				.build();

			categoryDtos.add(categoryDto);
		}

		return categoryDtos;
	}

	// 나와 같은 뉴스 기사를 읽은 직업군 조회
	public List<JobCntDto> selectJobsByReadNews(Integer userId) {
		//1. 읽은 뉴스 기사 목록 조회(userId)
		List<News> readNews = newsRepository.selectAllMyReadNews(userId);

		//2. 직업군 조회
		List<Job> jobList = jobRepository.findAll();
		int jobSize = jobList.size();

		//3. 뉴스 아이디에 해당하는 유저의 직업군 조회(newsId)
		int[] jobCntArray = new int[jobSize];

		Map<Integer, Integer> userMap = new HashMap<>();

		for (News news : readNews) {
			//유저조회
			List<User> userList = userRepository.selectUserByNews(news.getNewsId(), userId);
			int ulSize = userList.size();

			//리스트에 유저 값 저장
			for (int i = 0; i < ulSize; i++) {
				User user = userList.get(i);
				if (userMap.get(user.getUserId()) == null)
					userMap.put(user.getUserId(), user.getJob().getJobId());
			}
		}

		int mapSize = userMap.size();

		//3. 직업군 count
		for (Integer usId : userMap.keySet()) {
			jobCntArray[userMap.get(usId) - 1] += 1;
		}

		//4. count한 리스트 dto로 출력
		List<JobCntDto> jobCntDtos = new ArrayList<>();
		for (int i = 0; i < jobSize; i++) {
			Job job = jobList.get(i);
			JobCntDto jobCntDto = JobCntDto.builder()
				.id(job.getJobId())
				.name(job.getJobName())
				.cnt(jobCntArray[i])
				.build();

			jobCntDtos.add(jobCntDto);
		}

		return jobCntDtos;
	}
}
