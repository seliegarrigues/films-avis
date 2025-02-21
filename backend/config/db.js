// config/db.js
import { MongoClient } from "mongodb";

console.log(" DB_URI:", process.env.DB_URI);

const client = new MongoClient(process.env.DB_URI);
let db;

export async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log(" Connexion à MongoDB réussie !");
  } catch (error) {
    console.error(" Erreur de connexion à MongoDB :", error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error(" La base de données n'est pas connectée !");
  }
  return db;
}
