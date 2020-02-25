package com.tayfurunal.hrapplication.service.impl;

import com.tayfurunal.hrapplication.domain.Application;
import com.tayfurunal.hrapplication.domain.Job;
import com.tayfurunal.hrapplication.domain.User;
import com.tayfurunal.hrapplication.repository.ApplicationRepository;
import com.tayfurunal.hrapplication.repository.JobRepository;
import com.tayfurunal.hrapplication.repository.UserRepository;
import com.tayfurunal.hrapplication.service.ApplicationService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    final
    ApplicationRepository applicationRepository;

    final
    UserRepository userRepository;

    final
    JobRepository jobRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository, UserRepository userRepository, JobRepository jobRepository) {
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
    }

    @Override
    public Application makeApplication(Application application, Long jobId, String username) {
        User user = userRepository.getByUsername(username);
        Job job = jobRepository.getById(jobId);
        job.setNumberOfApplication(job.getNumberOfApplication() + 1);
        application.setUser(user);
        application.setJob(job);
        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getApplicationsByUsername(String username) {
        List<Application> applications = applicationRepository.findAllByUserUsername(username);
        return applications;
    }

    @Override
    public List<Application> getAllApplications() {
        List<Application> applications = applicationRepository.findAll();
        return applications;
    }
}
