package com.tayfurunal.hrapplication.repository;

import com.tayfurunal.hrapplication.domain.Role;
import com.tayfurunal.hrapplication.domain.RoleType;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleType name);
}

