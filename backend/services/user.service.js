// services/user.service.js
import User from "../models/user.js";
import bcrypt from "bcryptjs";

class UserService {
  async registerUser(firstname, name, email, password, role) {
    // Vérification de l'existance de l'utilisateur
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Un utilisateur avec cet email existe déjà.");
    }
    const user = await User.create({ firstname, name, email, password, role });
    return user.toObject();
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email ou mot de passe invalide.");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Email ou mot de passe invalide.");
    }
    return user.toObject();
  }

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) throw new Error("Utilisateur non trouvé.");
    return user.toObject();
  }

  async getAllUsers() {
    // Pour éviter de renvoyer le mot de passe et l'email
    return await User.find({}, "-password -email").lean();
  }

  async updateUser(id, firstname, name, email, password) {
    const update = { firstname, name, email };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, update, { new: true });
    if (!user) throw new Error("Utilisateur non trouvé.");
    return user.toObject();
  }

  async deleteUser(id) {
    await User.findByIdAndDelete(id);
  }
}

export default new UserService();
