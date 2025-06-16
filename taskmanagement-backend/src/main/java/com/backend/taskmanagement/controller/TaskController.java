package com.backend.taskmanagement.controller;

import com.backend.taskmanagement.dto.TaskRequest;
import com.backend.taskmanagement.dto.TaskResponse;
import com.backend.taskmanagement.service.TaskService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<TaskResponse> getAll() {
        return service.getAll();
    }

    @PostMapping
    public TaskResponse create(@RequestBody TaskRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public TaskResponse update(@PathVariable String id, @RequestBody TaskRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @PatchMapping("/{id}/status")
    public TaskResponse updateStatus(@PathVariable String id, @RequestParam String status) {
        return service.updateStatus(id, status);
    }

    @GetMapping("/filter")
    public List<TaskResponse> filterTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) String range,
            @RequestParam(defaultValue = "dueDate") String sortBy,
            @RequestParam(defaultValue = "asc") String order) {
        return service.filterTasks(status, priority, range, sortBy, order);
    }

}
