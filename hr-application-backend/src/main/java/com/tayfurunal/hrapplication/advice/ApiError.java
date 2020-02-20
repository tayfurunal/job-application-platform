package com.tayfurunal.hrapplication.advice;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Date;
import java.util.Map;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ApiError {

    private Long timestamp = new Date().getTime();
    private int status;
    private String message;
    private String url;

    private Map<String, String> validationErrors;

    public ApiError(int status, String message, String url) {
        this.status = status;
        this.message = message;
        this.url = url;
    }
}