package com.backend.taskmanagement.service;

import com.backend.taskmanagement.dto.SummaryResponse;
import com.backend.taskmanagement.model.Task;
import com.backend.taskmanagement.model.Habit;
import com.backend.taskmanagement.repository.TaskRepository;
import com.backend.taskmanagement.repository.HabitRepository;

import org.springframework.stereotype.Service;

import java.time.*;
import java.util.List;

@Service
public class SummaryService {

    private final TaskRepository taskRepo;
    private final HabitRepository habitRepo;

    public SummaryService(TaskRepository taskRepo, HabitRepository habitRepo) {
        this.taskRepo = taskRepo;
        this.habitRepo = habitRepo;
    }

    public SummaryResponse getSummary(String type, String scope, String category) {
        LocalDate today = LocalDate.now();
        LocalDateTime start, end;

        switch (scope) {
            case "weekly" -> {
                start = today.with(DayOfWeek.MONDAY).atStartOfDay();
                end = today.with(DayOfWeek.SUNDAY).atTime(LocalTime.MAX);
            }
            case "monthly" -> {
                start = today.withDayOfMonth(1).atStartOfDay();
                end = today.withDayOfMonth(today.lengthOfMonth()).atTime(LocalTime.MAX);
            }
            case "daily" -> {
                start = today.atStartOfDay();
                end = today.atTime(LocalTime.MAX);
            }
            default -> throw new IllegalArgumentException("Invalid scope: " + scope);
        }

        SummaryResponse response = new SummaryResponse();
        response.type = type;
        response.scope = scope;
        response.category = category;

        if (type.equals("task")) {
            List<Task> tasks = taskRepo.findAll();
            tasks = tasks.stream()
                    .filter(t -> t.getDueDate() != null &&
                            !t.getDueDate().isBefore(start) &&
                            !t.getDueDate().isAfter(end))
                    .filter(t -> category == null || category.equalsIgnoreCase(t.getCategory()))
                    .toList();

            long completed = tasks.stream().filter(t -> t.getStatus().equals("completed")).count();
            long pending = tasks.stream().filter(t -> t.getStatus().equals("pending")).count();

            response.total = tasks.size();
            response.completed = (int) completed;
            response.pending = (int) pending;
            response.completionRate = tasks.size() == 0 ? 0 : (completed * 100.0 / tasks.size());
        }

        if (type.equals("habit")) {
            List<Habit> habits = habitRepo.findAll();
            String dateKey = today.toString();

            habits = habits.stream()
                    .filter(h -> category == null || category.equalsIgnoreCase(h.getCategory()))
                    .toList();

            long completed = habits.stream().filter(h -> h.getCompletedDates().contains(dateKey)).count();

            response.total = habits.size();
            response.completed = (int) completed;
            response.pending = habits.size() - (int) completed;
            response.completionRate = habits.size() == 0 ? 0 : (completed * 100.0 / habits.size());
        }

        return response;
    }
}
