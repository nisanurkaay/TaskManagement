package com.backend.taskmanagement.repository;

import com.backend.taskmanagement.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepository extends MongoRepository<Task, String> {}
