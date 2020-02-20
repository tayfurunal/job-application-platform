package com.tayfurunal.hrapplication.controller;

import com.tayfurunal.hrapplication.advice.ApiError;
import com.tayfurunal.hrapplication.payload.request.LoginRequest;
import com.tayfurunal.hrapplication.payload.request.SignupRequest;
import com.tayfurunal.hrapplication.payload.response.MessageResponse;
import com.tayfurunal.hrapplication.security.jwt.JwtTokenProvider;
import com.tayfurunal.hrapplication.service.AuthenticationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@SuppressWarnings("ALL")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    final
    AuthenticationManager authenticationManager;

    final
    JwtTokenProvider jwtTokenProvider;

    final
    AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider,
                                    AuthenticationService authenticationService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) throws AuthenticationException {
        authenticationService.createUser(signUpRequest);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) throws AuthenticationException {
        ResponseEntity<?> authenticate = authenticationService.authenticateUser(loginRequest);
        return authenticate;
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiError handleValidationException(MethodArgumentNotValidException exception, HttpServletRequest request) {
        ApiError apiError = new ApiError(400, "Validation Error", request.getServletPath());

        BindingResult result = exception.getBindingResult();

        Map<String, String> validationErrros = new HashMap<>();
        for (FieldError fieldError : result.getFieldErrors()) {
            validationErrros.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        apiError.setValidationErrors(validationErrros);

        return apiError;
    }
}

