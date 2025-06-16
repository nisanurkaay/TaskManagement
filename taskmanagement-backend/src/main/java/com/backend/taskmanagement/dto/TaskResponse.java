package com.backend.taskmanagement.dto;

import java.time.LocalDateTime;

public class TaskResponse {
    public String id;
    public String title;
    public String description;
    public String priority;
    public String status;
    public LocalDateTime createdAt;
    public LocalDateTime dueDate;
    public String category;
}
