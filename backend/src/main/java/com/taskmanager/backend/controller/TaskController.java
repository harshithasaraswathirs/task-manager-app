package com.taskmanager.backend.controller;

import com.taskmanager.backend.dto.TaskRequest;
import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.model.User;
import com.taskmanager.backend.service.TaskService;
import com.taskmanager.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;

    // Helper: get the actual User entity from the JWT principal
    private User getCurrentUser(UserDetails userDetails) {
        return userService.findByEmail(userDetails.getUsername());
    }

    @GetMapping
    public ResponseEntity<List<Task>> getTasks(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(taskService.getTasksForUser(getCurrentUser(userDetails)));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskRequest request,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(taskService.createTask(request, getCurrentUser(userDetails)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,
                                           @RequestBody TaskRequest request,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(taskService.updateTask(id, request, getCurrentUser(userDetails)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id,
                                           @AuthenticationPrincipal UserDetails userDetails) {
        taskService.deleteTask(id, getCurrentUser(userDetails));
        return ResponseEntity.noContent().build();
    }
}