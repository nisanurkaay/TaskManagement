package com.backend.taskmanagement.dto;

import java.time.LocalDateTime;

public class TaskRequest {
    public String title;
    public String description;
    public String priority;
    public String status;
    public LocalDateTime dueDate;
    public String category;
}
