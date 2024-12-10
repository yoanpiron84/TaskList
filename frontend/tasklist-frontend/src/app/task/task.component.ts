import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  providers: [DatePipe]
})
export class TaskComponent implements OnInit{
  tasks: any[] = [];  // Liste des tâches à afficher

  archivedTasks: any[] = [];  // Liste des tâches archivées à afficher dans la colonne "Terminé"

  taskToEditID: number | undefined; // ID de la tâche à modifier qu'on stocke

  // Variables qui permettent de stocker les anciennes informations d'une tâche pour la modification dans le modal
  taskToEditTitle: string = '';
  taskToEditDescription: string = '';
  taskToEditStatus: string = '';

  // Variables qui permettent de stocker les nouvelles informations d'une tâche pour l'ajout d'une tâche
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskStatus: string = '';

  showError: boolean = false; // ID du div erreur pour le NgIf
  showErrorEdit: boolean = false;
  showModal: boolean = false; // ID du div modal edit pour le NgIf

  constructor(private taskService: TaskService, private datePipe: DatePipe, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {

    // Appel au service pour récupérer les tâches
    this.getTasks();
    this.getArchivedTasks();
  }

  // Fonction pour récupérer les tâches
  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches: ', err);
      }
    });
  }

  // Fonction pour récupérer les tâches archivées
  getArchivedTasks(): void {
    this.taskService.getArchivedTasks().subscribe({
      next: (archivedTasks) => {
        this.archivedTasks = archivedTasks;
        this.archivedTasks.forEach(task => {
          task.archivedDate = this.datePipe.transform(task.archivedDate, 'dd/MM/yyyy'); // Pour afficher le jour/mois/année sur l'application web
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches archivées: ', err);
      }
    });
  }

  // Fonction pour supprimer une tâche
  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        // On supprime la tâche de la liste locale
        this.tasks = this.tasks.filter(task => task.id !== taskId);
      },
      (error: any) => {
        console.error('Erreur lors de la suppression de la tâche', error);
      }
    );
  }

  // Fonction pour ajouter une nouvelle tâche
  createTask(): void {
    // Récupération des valeurs des champs via document.getElementById
    const newTaskTitle = (document.getElementById('newTaskTitle') as HTMLInputElement).value.trim();
    const newTaskDescription = (document.getElementById('newTaskDescription') as HTMLInputElement).value.trim();
    const newTaskStatus = (document.getElementById('newTaskStatus') as HTMLSelectElement).value;

    // Vérification si le titre et la description sont présents
    if (newTaskTitle && newTaskDescription) {
      this.showError = false;
      // Création de l'objet tâche
      const task: Task = {
        title: newTaskTitle,
        description: newTaskDescription,
        status: newTaskStatus,
      };

      // Appel du service pour ajouter la tâche
      this.taskService.createTask(task).subscribe({
        next: (createdTask) => {
          // On ajoute la tâche à la liste des tâches
          this.tasks.push(createdTask);

          this.getTasks();
          this.getArchivedTasks();

          // On vide les champs après l'ajout
          (document.getElementById('newTaskTitle') as HTMLInputElement).value = '';
          (document.getElementById('newTaskDescription') as HTMLInputElement).value = '';
          (document.getElementById('newTaskStatus') as HTMLSelectElement).value = 'A faire';
        },
        error: (err) => {
          console.error('Erreur lors de la création de la tâche: ', err);
        },
      });
    } else {
      this.showError = true;
      console.error('Veuillez remplir tous les champs.');
    }
  }

  // Fonction pour ouvrir le menu de modification
  editTask(task: Task): void {
    this.taskToEditID = task.id;
    this.taskToEditTitle = task.title;
    this.taskToEditDescription = task.description;
    this.taskToEditStatus = task.status;

    this.showModal = true;
  }

  // Fonction pour fermer le modal
  closeModal(){
    this.taskToEditID = undefined;
    this.taskToEditTitle = '';
    this.taskToEditDescription = '';
    this.taskToEditStatus = '';
    this.showModal = false;
  }

  // Fonction pour enregistrer les modifications
  saveTask(): void {

    const editedTask: Task = {
      id: this.taskToEditID,
      title: (document.getElementById('editTitle') as HTMLInputElement).value,
      description: (document.getElementById('editDescription') as HTMLInputElement).value,
      status: (document.getElementById('editStatus') as HTMLInputElement).value,
    };
    if(editedTask.title && editedTask.description && editedTask.status) {
      this.showErrorEdit = false;
      this.showModal = false;
      this.taskService.updateTask(editedTask).subscribe({
        next: (updatedTask) => {

          // Remplace la tâche dans la liste avec la version mise à jour
          const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;

            // Pour actualiser en temps réel sur l'interface
            this.getTasks();
            this.getArchivedTasks();
          }
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour de la tâche: ', err);
        }
      });
    } else{
      this.showErrorEdit = true;
      console.error('Veuillez remplir tous les champs.');
    }
  }
}
