package com.tayfurunal.hrapplication.repository;

import com.tayfurunal.hrapplication.domain.Application;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findAllByUserUsername(String username);

    Application getById(Long id);
}
