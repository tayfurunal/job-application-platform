package com.tayfurunal.hrapplication.service;

import com.tayfurunal.hrapplication.domain.Job;

public interface JobService {
    Job createJob(Job job);

    Job getJobById(Long id);

    Boolean deleteJobById(Long id);
}
