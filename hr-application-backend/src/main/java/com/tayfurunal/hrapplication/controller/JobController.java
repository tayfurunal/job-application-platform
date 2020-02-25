package com.tayfurunal.hrapplication.controller;

import com.tayfurunal.hrapplication.advice.ApiError;
import com.tayfurunal.hrapplication.domain.Job;
import com.tayfurunal.hrapplication.service.impl.JobServiceImpl;

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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@SuppressWarnings("ALL")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/job")
public class JobController {

    final
    JobServiceImpl jobService;

    public JobController(JobServiceImpl jobService) {
        this.jobService = jobService;
    }

    @PostMapping("")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> createJob(@Valid @RequestBody Job job) {
        Job newPost = jobService.createJob(job);
        return new ResponseEntity<Job>(newPost, HttpStatus.CREATED);
    }

    @GetMapping("/{jobId}")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> getJobById(@PathVariable(value = "jobId", required = true) Long jobId) {
        Job job = jobService.getJobById(jobId);
        return new ResponseEntity<Job>(job, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<Job>> getJobs() {
        List<Job> jobs = jobService.getJobs();
        return ResponseEntity.ok(jobs);
    }

    @PostMapping("/{jobId}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<?> deleteJobById(@PathVariable(value = "jobId", required = true) Long jobId) {
        return ResponseEntity.ok(jobService.deleteJobById(jobId));
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