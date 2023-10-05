package com.ssafy.newsum.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ssafy.newsum.domain.users.repository.UserRepository;
import com.ssafy.newsum.domain.users.service.LoginService;
import com.ssafy.newsum.global.jwt.JwtAuthenticationProcessingFilter;
import com.ssafy.newsum.global.jwt.JwtService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final LoginService loginService;
	private final JwtService jwtService;
	private final UserRepository userRepository;

	private final String[] allowedUrls = {

	};    // 로그인 안해도 되는 URL list

	// BCryptPasswordEncoder는 Spring Security에서 제공하는 비밀번호 암호화 객체입니다.
	// Service에서 비밀번호를 암호화할 수 있도록 Bean으로 등록합니다.
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
			.httpBasic()
			.disable()
			// 서버에 인증정보를 저장하지 않기 때문에 csrf를 사용하지 않음
			.csrf()
			.disable()
			.cors()
			.and()
			// session 기반의 인증을 하지 않기 때문에 stateless로 바꿔줌
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)

			// 기본 로그인페이지 없애기
			.formLogin()
			.disable()
			//인증, 권한 처리 필터 적용
			.addFilterBefore(jwtAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
			//요청에 대한 권한 설정
			.authorizeRequests()
			//모든 권한 허용
			// .antMatchers("/mypage/**").hasRole("UA01")
			// .antMatchers(HttpMethod.PATCH).hasRole("UA01")
			// .antMatchers(HttpMethod.DELETE).hasRole("UA01")
			// .antMatchers("/news/recommend/**", "/news/scrap/**", "/news/dibs/**").hasRole("UA01")
			.antMatchers("/**").permitAll()

		// .antMatchers("/**").permitAll()
		//1. 회원가입 모두 허용
		// .antMatchers("/user/**", "/api/v1/user")
		// .permitAll()
		// 토큰을 활용하는 경우 모든 요청에 대해 인가에 대해서 적용
		// .authorizeHttpRequests(requests ->
		// 	requests.anyRequest().permitAll()
		// )
		;

		return http.build();
	}

	@Bean
	public JwtAuthenticationProcessingFilter jwtAuthenticationProcessingFilter() {
		JwtAuthenticationProcessingFilter jwtAuthenticationFilter = new JwtAuthenticationProcessingFilter(jwtService,
			userRepository);
		return jwtAuthenticationFilter;
	}

	@Bean
	public AuthenticationManager authenticationManager() {
		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
		provider.setPasswordEncoder(passwordEncoder());
		provider.setUserDetailsService(loginService);
		return new ProviderManager(provider);
	}
}
