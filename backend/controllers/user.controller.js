// controllers/user.controller.js
import jwt from "jsonwebtoken";
import userService from "../services/user.service.js";

class UserController {
  async registerUser(req, res, next) {
    try {
      const { firstname, name, email, password, role } = req.body;
      const user = await userService.registerUser(
        firstname,
        name,
        email,
        password,
        role
      );
      // suppression du mot de passe de l'objet retourné
      delete user.password;
      res.status(201).json(user);
    } catch (err) {
      console.error("Erreur lors de la création de l'utilisateur", err);
      res.status(400).json({ error: err.message });
    }
  }

  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await userService.loginUser(email, password);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "prod",
      });
      // Suppression du mot de passe et autres infos sensibles avant l'envoi
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      console.error("Erreur lors de la connexion", err);
      res.status(401).json({ error: err.message });
    }
  }

  async logoutUser(req, res, next) {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Déconnexion réussie" });
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.userId);
      delete user.password;
      res.status(200).json(user);
    } catch (err) {
      console.error("Erreur lors de la récupération de l'utilisateur", err);
      res.status(404).json({ error: err.message });
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error(
        "Erreur lors de la récupération de tous les utilisateurs",
        err
      );
      res.status(400).json({ error: err.message });
    }
  }

  async updateUser(req, res, next) {
    try {
      const { firstname, name, email, password } = req.body;
      const updated = await userService.updateUser(
        req.userId,
        firstname,
        name,
        email,
        password
      );
      delete updated.password;
      res.status(200).json(updated);
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'utilisateur", err);
      res.status(400).json({ error: err.message });
    }
  }

  async deleteUser(req, res, next) {
    try {
      await userService.deleteUser(req.userId);
      res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (err) {
      console.error("Erreur lors de la suppression de l'utilisateur", err);
      res.status(400).json({ error: err.message });
    }
  }
}

export default UserController;
