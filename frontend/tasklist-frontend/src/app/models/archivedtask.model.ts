// Modèle de ArchivedTask avec ID optionnel car généré automatiquement
export interface ArchivedTask {
  id?: number;
  title: string;
  description: string;
  status: string;
  archivedDate: Date;
}
