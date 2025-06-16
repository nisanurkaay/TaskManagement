package com.backend.taskmanagement.controller;

import com.backend.taskmanagement.dto.CategoryRequest;
import com.backend.taskmanagement.dto.CategoryResponse;
import com.backend.taskmanagement.service.CategoryService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoryResponse> getAll() {
        return service.getAll();
    }

    @PostMapping
    public CategoryResponse create(@RequestBody CategoryRequest req) {
        return service.create(req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
