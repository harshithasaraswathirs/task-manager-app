package com.taskmanager.backend.dto;

import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private boolean completed;
}