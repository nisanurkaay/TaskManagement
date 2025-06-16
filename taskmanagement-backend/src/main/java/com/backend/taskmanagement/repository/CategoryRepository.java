package com.backend.taskmanagement.repository;

import com.backend.taskmanagement.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {}