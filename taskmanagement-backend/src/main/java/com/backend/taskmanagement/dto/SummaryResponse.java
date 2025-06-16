package com.backend.taskmanagement.dto;

public class SummaryResponse {
    public int total;
    public int completed;
    public int pending;
    public double completionRate; 

    public String type;    
    public String scope;   
    public String category;  
}
