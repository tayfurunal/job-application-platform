package com.tayfurunal.hrapplication.service.impl;

import com.tayfurunal.hrapplication.domain.Application;
import com.tayfurunal.hrapplication.domain.Job;
import com.tayfurunal.hrapplication.domain.User;
import com.tayfurunal.hrapplication.repository.ApplicationRepository;
import com.tayfurunal.hrapplication.repository.JobRepository;
import com.tayfurunal.hrapplication.repository.UserRepository;
import com.tayfurunal.hrapplication.service.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JobRepository jobRepository;

    @Override
    public Application makeApplication(Application application, Long jobId, String username) {
        User user = userRepository.getByUsername(username);
        Job job = jobRepository.getById(jobId);
        application.setUser(user);
        application.setJob(job);
        return applicationRepository.save(application);
    }
}
