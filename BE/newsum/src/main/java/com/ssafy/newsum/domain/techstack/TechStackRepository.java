package com.ssafy.newsum.domain.techstack;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.newsum.domain.techstack.entity.TechStack;

public interface TechStackRepository extends JpaRepository<TechStack, Integer> {
}
