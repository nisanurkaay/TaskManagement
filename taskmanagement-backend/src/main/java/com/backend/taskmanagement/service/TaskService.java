package com.backend.taskmanagement.service;

import com.backend.taskmanagement.dto.TaskRequest;
import com.backend.taskmanagement.dto.TaskResponse;
import com.backend.taskmanagement.model.Task;
import com.backend.taskmanagement.repository.TaskRepository;
import com.backend.taskmanagement.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<TaskResponse> getAll() {
        return repository.findAll()
            .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public TaskResponse create(TaskRequest req) {
        Task task = new Task();
        task.setTitle(req.title);
        task.setDescription(req.description);
        task.setPriority(req.priority);
        task.setStatus(req.status);
        task.setDueDate(req.dueDate);
        task.setCreatedAt(java.time.LocalDateTime.now());
        task.setCategory(req.category);
        return toResponse(repository.save(task));
    }

    public TaskResponse update(String id, TaskRequest req) {
        Task task = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
        task.setTitle(req.title);
        task.setDescription(req.description);
        task.setPriority(req.priority);
        task.setStatus(req.status);
        task.setDueDate(req.dueDate);
        task.setCategory(req.category);
        return toResponse(repository.save(task));
    }

    public void delete(String id) {
        repository.deleteById(id);
    }


    public TaskResponse updateStatus(String id, String status) {
    Task task = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

    task.setStatus(status);
    return toResponse(repository.save(task));
    }


    public List<TaskResponse> filterTasks(String status, String priority, String range, String sortBy, String order) {
    List<Task> tasks = repository.findAll();


    if (status != null) {
        tasks = tasks.stream()
                .filter(t -> t.getStatus().equalsIgnoreCase(status))
                .collect(Collectors.toList());
    }

    if (priority != null) {
        tasks = tasks.stream()
                .filter(t -> t.getPriority().equalsIgnoreCase(priority))
                .collect(Collectors.toList());
    }


    if (range != null) {
        LocalDateTime now = LocalDateTime.now();
        tasks = tasks.stream().filter(t -> {
            if (t.getDueDate() == null) return false;
            if (range.equals("today")) {
                return t.getDueDate().toLocalDate().isEqual(now.toLocalDate());
            } else if (range.equals("thisWeek")) {
                LocalDate start = now.with(DayOfWeek.MONDAY).toLocalDate();
                LocalDate end = now.with(DayOfWeek.SUNDAY).toLocalDate();
                return !t.getDueDate().toLocalDate().isBefore(start) &&
                       !t.getDueDate().toLocalDate().isAfter(end);
            } else if (range.equals("thisMonth")) {
                return t.getDueDate().getMonth().equals(now.getMonth()) &&
                       t.getDueDate().getYear() == now.getYear();
            }
            return true;
        }).collect(Collectors.toList());
    }


    Comparator<Task> comparator;
    switch (sortBy) {
        case "createdAt":
            comparator = Comparator.comparing(Task::getCreatedAt, Comparator.nullsLast(Comparator.naturalOrder()));
            break;
        case "priority":
            comparator = Comparator.comparing(
                t -> switch (t.getPriority()) {
                    case "low" -> 1;
                    case "medium" -> 2;
                    case "high" -> 3;
                    default -> 0;
                }
            );
            break;
        case "dueDate":
        default:
            comparator = Comparator.comparing(Task::getDueDate, Comparator.nullsLast(Comparator.naturalOrder()));
    }

    if ("desc".equalsIgnoreCase(order)) {
        comparator = comparator.reversed();
    }

    tasks.sort(comparator);

    return tasks.stream().map(this::toResponse).collect(Collectors.toList());
}


    private TaskResponse toResponse(Task task) {
        TaskResponse res = new TaskResponse();
        res.id = task.getId();
        res.title = task.getTitle();
        res.description = task.getDescription();
        res.priority = task.getPriority();
        res.status = task.getStatus();
        res.createdAt = task.getCreatedAt();
        res.dueDate = task.getDueDate();
        res.category = task.getCategory();
        return res;
    }
}
