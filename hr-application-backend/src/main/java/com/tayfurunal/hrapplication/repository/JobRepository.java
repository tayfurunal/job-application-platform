package com.tayfurunal.hrapplication.repository;

import com.tayfurunal.hrapplication.domain.Job;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
    Job getById(Long id);
}
