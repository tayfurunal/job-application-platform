package com.tayfurunal.hrapplication.service;

import com.tayfurunal.hrapplication.payload.request.LoginRequest;
import com.tayfurunal.hrapplication.payload.request.SignupRequest;

import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    void createUser(SignupRequest signUpRequest);

    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);
}
