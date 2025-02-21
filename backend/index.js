// index.js
import app from "./server.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 8000;

async function main() {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(` Serveur en cours d'exécution sur le port ${port}`);
    });
  } catch (err) {
    console.error(" Erreur lors du démarrage du serveur :", err);
  }
}

main();
