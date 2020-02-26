package com.tayfurunal.hrapplication.service;

import com.tayfurunal.hrapplication.domain.Application;

import java.util.List;

public interface ApplicationService {
    Application makeApplication(Application application, Long jobId, String username);
    List<Application> getApplicationsByUsername(String username);
    List<Application> getAllApplications();
    Application getApplicationById(Long id);
}
