package com.ssafy.newsum.domain.techstack.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.newsum.domain.techstack.entity.TechStack;

public interface TechStackRepository extends JpaRepository<TechStack, Integer> {
}
