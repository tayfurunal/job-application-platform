package com.tayfurunal.hrapplication.domain;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "job_list")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Job extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be blank")
    private String jobTitle;

    @NotBlank(message = "Description cannot be blank")
    private String jobDescription;

    @NotBlank(message = "Summary cannot be blank")
    private String jobDescriptionSummary;

    private Integer numberOfApplication = 0;

    private Boolean isClosed = false;

    @JsonFormat(pattern = "yyyy-mm-dd")
    @FutureOrPresent(message = "Last Application Date must be in the future")
    @NotNull(message = "Date cannot be blank")
    private Date lastApplication;
}
