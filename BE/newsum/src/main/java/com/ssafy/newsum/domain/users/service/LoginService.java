package com.ssafy.newsum.domain.users.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ssafy.newsum.domain.users.entity.User;
import com.ssafy.newsum.domain.users.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LoginService implements UserDetailsService {

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(userEmail)
			.orElseThrow(() -> new UsernameNotFoundException("NOT_EXISTS_USER"));

		return org.springframework.security.core.userdetails.User.builder()
			.username(user.getEmail())
			.password(user.getPassword())
			.roles(user.getAuthenticate())
			.build();
	}

}