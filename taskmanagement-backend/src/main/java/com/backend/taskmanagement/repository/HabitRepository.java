package com.backend.taskmanagement.repository;


import com.backend.taskmanagement.model.Habit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HabitRepository extends MongoRepository<Habit, String> {}