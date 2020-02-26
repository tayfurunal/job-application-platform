package com.tayfurunal.hrapplication.service.impl;

import com.tayfurunal.hrapplication.domain.Job;
import com.tayfurunal.hrapplication.repository.JobRepository;
import com.tayfurunal.hrapplication.service.JobService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    final
    JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public Job createJob(Job job) {
        Job newJob = jobRepository.save(job);
        return newJob;
    }

    @Override
    public Job getJobById(Long id) {
        Job job = jobRepository.getById(id);
        if (job != null)
            return job;
        else
            throw new IllegalArgumentException("Job not found!");
    }

    @Override
    public List<Job> getJobs() {
        List<Job> jobs = jobRepository.findAllByIsClosedEqualsOrderByIdAsc(false);
        return jobs;
    }

    @Override
    public Job deleteJobById(Long id) {
        Job job = jobRepository.getById(id);
        if (job != null) {
           job.setIsClosed(true);
        } else {
            throw new IllegalArgumentException("Job not found!");
        }
        jobRepository.save(job);
        return job;
    }
}
