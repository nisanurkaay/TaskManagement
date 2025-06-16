package com.backend.taskmanagement.controller;

import com.backend.taskmanagement.dto.SummaryResponse;
import com.backend.taskmanagement.service.SummaryService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/summary")
@CrossOrigin(origins = "http://localhost:3000")
public class SummaryController {

    private final SummaryService service;

    public SummaryController(SummaryService service) {
        this.service = service;
    }

    @GetMapping
    public SummaryResponse getSummary(
        @RequestParam String type,           
        @RequestParam String scope,      
        @RequestParam(required = false) String category
    ) {
        return service.getSummary(type, scope, category);
    }
}
