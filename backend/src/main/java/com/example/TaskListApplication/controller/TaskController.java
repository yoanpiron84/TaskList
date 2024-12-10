package com.example.TaskListApplication.controller;

import com.example.TaskListApplication.TaskListApplication;
import com.example.TaskListApplication.model.Task;
import com.example.TaskListApplication.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskListApplication taskListApplication;

    @Autowired
    private TaskRepository taskRepository;

    // Récupération de toutes les tâches
    @GetMapping
    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();

        for(Task task: tasks) {
            checkStatusTask(task);
        }

        // On retourne la liste des tâches
        return tasks;
    }

    // Création d'une tâche
    @PostMapping
    public Task createTask(@RequestBody Task task) {

        task = taskRepository.save(task);

        // Après avoir sauvegardé la tâche, on appelle checkStatusTask(task)
        checkStatusTask(task);

        return task;
    }

    // Modification d'une tâche
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        // On s'assure que la tâche existante est récupérée avant la mise à jour
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tâche introuvable avec l'ID: " + id));

        // On met à jour les champs de la tâche existante avec les nouvelles valeurs
        existingTask.setDescription(task.getDescription());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());

        // On met à jour les informations de la tâche dans la base de données
        existingTask = taskRepository.save(existingTask);

        checkStatusTask(existingTask);

        // Retourner la tâche mise à jour
        return existingTask;
    }


    // Suppression d'une tâche
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }

    // Fonction de vérification de statut d'une tâche
    private void checkStatusTask(Task task) {

        // Lancer le job batch seulement si la tâche est marquée comme "Terminé"
        if ("Terminé".equals(task.getStatus())) {
            taskListApplication.runBatchJob();

            taskRepository.delete(task); // Supprime la tâche de la table principale (task)
        }

        taskRepository.flush();
    }

}
