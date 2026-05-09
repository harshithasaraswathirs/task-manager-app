package com.taskmanager.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "users")
@Data  // Lombok: auto-generates getters, setters, toString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @JsonIgnore
    @Column(nullable = false)
    private String password; // will be stored as bcrypt hash, never plain text

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

  
}