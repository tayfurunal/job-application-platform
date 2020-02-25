package com.tayfurunal.hrapplication.service;

import com.tayfurunal.hrapplication.domain.Job;

import java.util.List;

public interface JobService {
    Job createJob(Job job);

    Job getJobById(Long id);

    List<Job> getJobs();

    Job deleteJobById(Long id);
}
