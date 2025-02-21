// index.js
import app from "./server.js";
import { connectDB } from "./config/db.js";
import ReviewsService from "./services/reviews.service.js";
console.log("DB_URI:", process.env.DB_URI);

const port = process.env.PORT || 8000;

async function main() {
  try {
    await connectDB();
    console.log(" Connexion à la base de données réussie !");

    console.log("Initialisation du service des avis...");
    await ReviewsService;

    app.listen(port, () => {
      console.log(` Serveur en cours d'exécution sur le port ${port}`);
    });
  } catch (err) {
    console.error(" Erreur lors du démarrage du serveur :", err);
    process.exit(1);
  }
}

main();
