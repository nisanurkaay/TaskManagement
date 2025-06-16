package com.backend.taskmanagement.service;

import com.backend.taskmanagement.dto.CategoryRequest;
import com.backend.taskmanagement.dto.CategoryResponse;
import com.backend.taskmanagement.model.Category;
import com.backend.taskmanagement.repository.CategoryRepository;
import com.backend.taskmanagement.exception.ResourceNotFoundException;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public List<CategoryResponse> getAll() {
        return repository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public CategoryResponse create(CategoryRequest req) {
        Category category = new Category();
        category.setName(req.name);
        category.setType(req.type);
        return toResponse(repository.save(category));
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    private CategoryResponse toResponse(Category c) {
        CategoryResponse res = new CategoryResponse();
        res.id = c.getId();
        res.name = c.getName();
        res.type = c.getType();

        return res;
    }
}
