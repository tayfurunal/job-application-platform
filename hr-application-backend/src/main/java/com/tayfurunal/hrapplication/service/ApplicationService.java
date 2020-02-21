package com.tayfurunal.hrapplication.service;

import com.tayfurunal.hrapplication.domain.Application;

public interface ApplicationService {
    Application makeApplication(Application application, Long jobId, String username);
}
