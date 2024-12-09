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
la liste des tâches.

Pour ajouter une tâche, il faudra se mettre en méthode POST et spécifier
la valeur de title, description et status.

Pour modifier une tâche, il faudra mettre une méthode PUT et
définir la requête http://localhost:8080/tasks/1 par exemple pour modifier
la tâche avec un ID à 1 et préciser dans la section Body en
cochant "raw" les champs que l'on modifie (title, description, status).

Enfin, pour supprimer une tâche, il faudra utiliser la méthode DELETE et
spécifier l'ID de la tâche que l'on veut supprimer:

http://localhost:8080/tasks/1 pour supprimer la tâche 1.






