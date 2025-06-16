package com.backend.taskmanagement.controller;

import com.backend.taskmanagement.dto.HabitRequest;
import com.backend.taskmanagement.dto.HabitResponse;
import com.backend.taskmanagement.service.HabitService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@CrossOrigin(origins = "http://localhost:3000")
public class HabitController {

    private final HabitService service;

    public HabitController(HabitService service) {
        this.service = service;
    }

    @GetMapping
    public List<HabitResponse> getAll() {
        return service.getAll();
    }

    @PostMapping
    public HabitResponse create(@RequestBody HabitRequest request) {
        return service.create(request);
    }

    @PatchMapping("/{id}/complete")
    public HabitResponse markCompleted(@PathVariable String id, @RequestParam String date) {
        return service.markCompleted(id, date); // e.g. ?date=2025-06-11
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }

    @PutMapping("/{id}")
public HabitResponse update(@PathVariable String id, @RequestBody HabitRequest request) {
    return service.update(id, request);
}

}
