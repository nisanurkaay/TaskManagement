package com.backend.taskmanagement.dto;


import java.time.LocalDateTime;
import java.util.List;

public class HabitResponse {
    public String id;
    public String title;
    public String description;
    public String repeat;
    public LocalDateTime createdAt;
    public List<String> completedDates;
    public String category;
}
