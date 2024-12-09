import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';

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

  // Création d'une tâche
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Modification d'une tâche
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`this.apiUrl/${id}`, task);
  }

  // Suppression d'une tâche
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`this.apiUrl/${id}`);
  }
}
