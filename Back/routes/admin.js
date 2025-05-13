const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// 📌 Inscription Admin (Uniquement pour ajouter un admin)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'admin existe déjà
  db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email],
    async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "Admin déjà existant" });
      }

      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer l'admin
      db.query(
        "INSERT INTO admins (email, password) VALUES (?, ?)",
        [email, hashedPassword],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Admin créé avec succès" });
        }
      );
    }
  );
});

// 📌 Connexion Admin
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM admins WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      const admin = result[0];

      // Vérification du mot de passe
      const isValidPassword = await bcrypt.compare(password, admin.password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Génération du token JWT
      const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ message: "Connexion réussie", token });
    }
  );
});

module.exports = router;
