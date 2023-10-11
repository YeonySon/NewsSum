package com.ssafy.newsum.domain.job.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafy.newsum.domain.job.Job;
import com.ssafy.newsum.domain.job.repository.JobRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobService {
	private final JobRepository jobRepository;

	public Boolean getJobById(Integer jobId) {
		Optional<Job> jobOpt = jobRepository.findById(jobId);
		if (jobOpt.isPresent())
			return true;
		return false;
	}
}
