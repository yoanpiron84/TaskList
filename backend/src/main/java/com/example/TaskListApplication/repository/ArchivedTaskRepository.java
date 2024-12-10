package com.example.TaskListApplication.repository;

import com.example.TaskListApplication.model.ArchivedTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArchivedTaskRepository extends JpaRepository<ArchivedTask, Long> {
    /* Pas besoin de méthodes comme ArchivedTaskRepository extends JpaRepository et que
    JpaRepository gère déjà les méthodes de base (find, findAll(),...) */
}
