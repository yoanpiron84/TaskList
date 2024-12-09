package com.example.TaskListApplication.repository;

import com.example.TaskListApplication.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    /* Pas besoin de méthodes comme TaskReposiroty extends JpaRepository et que
    JpaRepository gère déjà les méthodes de base (find, findAll(),...) */
}
