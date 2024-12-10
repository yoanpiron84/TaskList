import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Task } from './models/task.model';
import { ArchivedTask } from './models/archivedtask.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/tasks';  // URL de l'API REST de l'application Spring Boot

  constructor(private http: HttpClient) {}

  // Récupération de toutes les tâches
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getArchivedTasks(): Observable<ArchivedTask[]> {
    return this.http.get<ArchivedTask[]>(this.apiUrl+'/archived');
  }

  // Création d'une tâche
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Modification d'une tâche
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // Suppression d'une tâche
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }
}
