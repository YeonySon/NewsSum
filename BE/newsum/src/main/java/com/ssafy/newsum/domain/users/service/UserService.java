package com.ssafy.newsum.domain.users.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.ssafy.newsum.domain.headline.HeadlineRepository;
import com.ssafy.newsum.domain.headline.entity.Headline;
import com.ssafy.newsum.domain.techstack.TechStackRepository;
import com.ssafy.newsum.domain.techstack.entity.TechStack;
import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	private final HeadlineRepository headlineRepository;
	private final TechStackRepository techStackRepository;

	//기술스택 리스트 출력
	public List<TechStack> getAllTechStackList() {
		return techStackRepository.findAll();
	}

	//헤드라인 리스트 출력
	public List<Headline> getAllHeadline() {
		return headlineRepository.findAll();
	}

	//회원 가입

	//회원 탈퇴(계정 삭제)
	@Transactional
	public boolean withdrawal(String userEmail) {
		Optional userObject = userRepository.findByEmail(userEmail);
		//user 계정 유무 확인
		if (userObject.isEmpty()) {
			return false;
		}

		User user = (User)userObject.get();
		userRepository.deleteById(user.getUserId());
		return true;
	}
}
