package com.backend.taskmanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "habits")
public class Habit {

    @Id
    private String id;

    private String title;
    private String description;
    private String repeat; // "daily", "weekly", "custom"
    private LocalDateTime createdAt;
    private List<String> completedDates; // e.g. ["2025-06-10", "2025-06-11"]
    private String category;

   public String getCategory() {
       return category;
   }
   public List<String> getCompletedDates() {
       return completedDates;
   }
   public LocalDateTime getCreatedAt() {
       return createdAt;
   }
   public String getDescription() {
       return description;
   }
   public String getId() {
       return id;
   }
   public String getRepeat() {
       return repeat;
   }
   public String getTitle() {
       return title;
   }

   public void setCategory(String category) {
       this.category = category;
   }
   public void setCompletedDates(List<String> completedDates) {
       this.completedDates = completedDates;
   }
   public void setCreatedAt(LocalDateTime createdAt) {
       this.createdAt = createdAt;
   }
   public void setDescription(String description) {
       this.description = description;
   }
   public void setId(String id) {
       this.id = id;
   }
   public void setRepeat(String repeat) {
       this.repeat = repeat;
   }
   public void setTitle(String title) {
       this.title = title;
   }
}
