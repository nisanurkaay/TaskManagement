package com.backend.taskmanagement.service;

import com.backend.taskmanagement.dto.HabitRequest;
import com.backend.taskmanagement.dto.HabitResponse;
import com.backend.taskmanagement.exception.ResourceNotFoundException;
import com.backend.taskmanagement.model.Habit;
import com.backend.taskmanagement.repository.HabitRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HabitService {

    private final HabitRepository repository;

    public HabitService(HabitRepository repository) {
        this.repository = repository;
    }

    public List<HabitResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public HabitResponse create(HabitRequest req) {
        Habit habit = new Habit();
        habit.setTitle(req.title);
        habit.setDescription(req.description);
        habit.setRepeat(req.repeat);
        habit.setCategory(req.category);
        habit.setCreatedAt(LocalDateTime.now());
        habit.setCompletedDates(new ArrayList<>());
        return toResponse(repository.save(habit));
    }

    public HabitResponse markCompleted(String id, String date) {
        Habit habit = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Habit not found"));
        List<String> dates = habit.getCompletedDates();
        if (!dates.contains(date)) {
            dates.add(date);
        }
        return toResponse(repository.save(habit));
    }

    public void delete(String id) {
        repository.deleteById(id);
    }


    public HabitResponse update(String id, HabitRequest req) {
    Habit habit = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Habit not found"));

    habit.setTitle(req.title);
    habit.setDescription(req.description);
    habit.setRepeat(req.repeat);
    habit.setCategory(req.category);

    return toResponse(repository.save(habit));
}
 
    private HabitResponse toResponse(Habit h) {
        HabitResponse res = new HabitResponse();
        res.id = h.getId();
        res.title = h.getTitle();
        res.description = h.getDescription();
        res.repeat = h.getRepeat();
        res.createdAt = h.getCreatedAt();
        res.completedDates = h.getCompletedDates();
        res.category = h.getCategory();
        return res;
    }
}
