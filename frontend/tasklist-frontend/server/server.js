const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8081;

// Configuration de cors
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Serve les fichiers statiques dans le dossier 'dist/tasklist-frontend'
app.use(express.static(path.join(__dirname, '..', 'dist', 'tasklist-frontend', 'browser')));

// Gère les redirections de toutes les routes vers index.html pour permettre le routage Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'tasklist-frontend', 'browser', 'index.html'));
});

// Démarre le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
