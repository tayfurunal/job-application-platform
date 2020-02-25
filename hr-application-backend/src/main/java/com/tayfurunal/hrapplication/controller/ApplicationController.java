package com.tayfurunal.hrapplication.controller;

import com.tayfurunal.hrapplication.advice.ApiError;
import com.tayfurunal.hrapplication.domain.Application;
import com.tayfurunal.hrapplication.service.impl.ApplicationServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@SuppressWarnings("ALL")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/application")
public class ApplicationController {
    @Autowired
    ApplicationServiceImpl applicationService;

    @PostMapping("/{jobId}")
    @PreAuthorize("hasRole('APPLICANT') or hasRole('HR')")
    public ResponseEntity<?> createApplication(@PathVariable(value = "jobId", required = true) Long jobId,
                                           @Valid @RequestBody Application application, Principal principal) {
        Application newApplication = applicationService.makeApplication(application,jobId, principal.getName());
        return new ResponseEntity<Application>(newApplication, HttpStatus.CREATED);
    }

    @GetMapping("/{username}")
    @PreAuthorize("hasRole('APPLICANT')")
    public ResponseEntity<?> getApplicationsByUsername(@PathVariable(value = "username",required = true) String username){
        List<Application> applications = applicationService.getApplicationsByUsername(username);
        return ResponseEntity.ok(applications);
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
