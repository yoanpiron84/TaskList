// Modèle de Task avec ID optionnel car généré automatiquement
export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;
}
