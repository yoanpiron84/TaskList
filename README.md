# TaskListApplication

######################################
######## Clonage du projet ###########
######################################

Tout d'abord, pour pouvoir tester l'application,
il vous faudra créer un dossier nommé:

TaskListApplication

Une fois que vous serez dans ce dossier, il
faudra réaliser un git clone du projet
en vous rendant sur le dépot Git:

git clone https://github.com/yoanpiron84/TaskList

Normalement, vous devriez avoir 2 dossiers:

backend et frontend

######################################
########## PARTIE BACK END ###########
######################################

Pour tester la partie backend et vérifier que
celle-ci fonctionne, il suffit d'ouvrir un
environnement de développement comme IntellijIdea
par exemple, de vous rendre dans le dossier backend et
d'exécuter la commande:

mvn clean install (ou directement via l'interface IntellijIdea)

Cela nous sera utile pour récupérer les dépendances maven pour
la suite de notre projet.

Une fois les dépendances récupérées, vous pouvez lancer
l'application (TaskListApplication.java dans com.example.TaskListApplication)

Si l'application s'est lancée correctement, il faut se rendre
sur une plateforme de développement d'API telle que Postman
pour tester les interractions avec notre API.

Dans Postman, pour par exemple tester la requête de récupération
des tâches, il faudra indiquer la méthode GET et
écrire la requête http://localhost:8080/tasks pour récupérer
la liste des tâches et http://localhost:8080/tasks/archived pour récupérer la
liste des tâches archivées.

Pour ajouter une tâche, il faudra se mettre en méthode POST et spécifier
la valeur de title, description et status.

Pour modifier une tâche, il faudra mettre une méthode PUT et
définir la requête http://localhost:8080/tasks/1 par exemple pour modifier
la tâche avec un ID à 1 et préciser dans la section Body en
cochant "raw" les champs que l'on modifie (title, description, status).

Enfin, pour supprimer une tâche, il faudra utiliser la méthode DELETE et
spécifier l'ID de la tâche que l'on veut supprimer:

http://localhost:8080/tasks/1 pour supprimer la tâche 1.

######################################
######### PARTIE FRONT END ###########
######################################

Pour la partie frontend, il faut d'abord ouvrir un terminal au niveau du répertoire frontend/tasklist-frontend et de taper:
taper la commande ng serve pour lancer l'application Angular en mode développeur (dans ce cas il faudra accéder à l'application web par l'adresse http://localhost:4200

Si vous souhaitez accéder à l'application en mode distribué, il faut lancer le script server.js situé dans le dossier server avec la commande node server.js (adresse: http://localhost:8081 )

###### AJOUT DE TACHE #####

Pour tester l'application, il suffit de renseigner les champs de la tâche à ajouter dans la partie "Ajouter une tâche" en renseignant son nom, sa description et son statut.

Une fois cela fait, ajouter la tâche en cliquant sur le bouton "Ajouter"

La tâche se retrouvera dans la catégorie associée à son statut (A faire, En cours, Terminé)

NB: Une tâche classifiée comme "Terminée" ne peut pas être modifiée car elle est stockée dans une autre table archived_task (Spring Batch)
Le jour associé à l'archivage est noté en dessous des tâches terminées.

###### MODIFICATION DE TACHE #####

Pour modifier une tâche, il faut cliquer sur l'icon crayon et les champs sont pré-remplis contenant les anciennes informations
de la tâche, il vous suffit de modifier ce que vous souhaitez et modifier le statut (Un statut modifié à Terminé entrainera l'archivage 
de la tâche).

###### SUPPRESSION DE TACHE #####
Pour supprimer une tâche, il suffit de cliquer sur l'icon poubelle en rouge à côté de la tâche

######################################
######### CHOIX TECHNIQUES ###########
######################################

###### BASE DE DONNEE #####

Pour développer cette application, j'ai choisi comme base de donnée SQLite car
cette base de donnée est portable (fichier .db) et peut être utilisée
à partir de n'importe quelle machine sans avoir besoin de lancer un serveur.

###### SERVEUR NODEJS #####

Pour la partie distribuée (et non mode développeur) d'angular, j'ai choisi d'utiliser un serveur NodeJS pour définir le port d'écoute à 8081 
pour l'application distribuée et cela permet également de rediriger les routes par défaut vers notre AppComponent qui est
notre composant principal de l'application. Il permet également d'autoriser les actions "GET", "POST", "PUT", "DELETE" depuis notre origine (adresse du
backend avec l'application Spring Boot: http://localhost:8080 ).

###### CSS/BOOTSTRAP #####

Pour le design de l'interface j'ai utilisé la feuille de style bootstrap et bootstrap-icons (pour les icons suppression et
modification) ainsi que CSS pour la position des éléments et couleurs.

###### COMPOSANTS ANGULAR #####

J'ai choisi de créer un composant "task" qui sera imbriqué dans le composant principal AppComponent
et de communiquer avec l'API REST par l'intermédiaire d'un service "task-service".







