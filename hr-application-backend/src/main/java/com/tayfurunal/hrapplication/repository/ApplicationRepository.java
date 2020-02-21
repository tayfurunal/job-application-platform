package com.tayfurunal.hrapplication.repository;

import com.tayfurunal.hrapplication.domain.Application;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
