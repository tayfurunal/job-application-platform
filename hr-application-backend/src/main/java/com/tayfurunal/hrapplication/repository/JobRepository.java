package com.tayfurunal.hrapplication.repository;

import com.tayfurunal.hrapplication.domain.Job;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    Job getById(Long id);
    List<Job> findAllByOrderByIdAsc();
    List<Job> findAllByIsClosedEqualsOrderByIdAsc(Integer isClosed);
}
