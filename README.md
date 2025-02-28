# Movie Reviews

Movie Reviews est une API backend développée en Node.js avec Express et MongoDB, permettant de gérer des films et leurs critiques.

## Description

Ce projet permet de :

- Récupérer une liste de films.
- Obtenir les détails d'un film par son ID, incluant les critiques associées.
- Ajouter, mettre à jour et supprimer des critiques pour un film.

## Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/seliegarrigues/movie-reviews.git
   ```

````

2. **Se positionner dans le dossier du projet :**

   ```bash
   cd movie-reviews
   ```

3. **Installer les dépendances :**
   ```bash
   npm install
   ```

## Configuration de l'environnement

1. **Créer un fichier `.env`**
   Le projet utilise un fichier `.env` pour stocker les variables d'environnement sensibles.
   Pour démarrer, copie le fichier d'exemple et renseigne tes propres valeurs :
   ```bash
   cp .env.example .env
   ```
2. **Variables à configurer dans `.env` :**
   - `MOVIEREVIEWS_DB_URI` : L'URI de connexion à MongoDB.
   - `MOVIEREVIEWS_NS` : Le nom de la base de données utilisée.
   - `PORT` : Le port sur lequel le serveur va écouter (par défaut, 5000).

## Utilisation

Pour démarrer le serveur, lance la commande :

```bash
npm start
```

Le serveur se lancera sur le port défini dans le fichier `.env` (par défaut, [http://localhost:5000](http://localhost:5000)).
Tu peux ensuite tester les endpoints de l'API avec Postman ou tout autre client HTTP.

## Endpoints de l'API

- `GET /api/v1/movies` : Récupère la liste des films.
- `GET /api/v1/movies/id/:id` : Récupère les détails d'un film par son ID.
- `GET /api/v1/movies/ratings` : Récupère les différentes notations des films.
- `POST /api/v1/movies/review` : Ajoute une critique.
- `PUT /api/v1/movies/review` : Met à jour une critique existante.
- `DELETE /api/v1/movies/review` : Supprime une critique.

## Contribuer

Les contributions sont les bienvenues !
Si tu souhaites proposer des améliorations ou corriger des bugs, n'hésite pas à ouvrir une issue ou à soumettre une pull request.

## Licence

Ce projet est sous licence MIT.

```

---

En suivant ces étapes, ton code sera correctement envoyé sur GitHub et ton dépôt sera configuré pour ne pas inclure les données sensibles et le dossier `node_modules`.

Si tu as d'autres questions ou besoin de précisions supplémentaires, n'hésite pas !
```
````
