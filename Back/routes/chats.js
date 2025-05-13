const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyAdminToken = require("../middleware/auth"); // 🔹 Importer le middleware

// 🔹 Récupérer tous les chats (Public)
router.get("/", (req, res) => {
  const sql = `
    SELECT c.*, 
           COALESCE(GROUP_CONCAT(p.url), '') AS photos 
    FROM chats c
    LEFT JOIN photos_chats p ON c.id = p.chat_id
    GROUP BY c.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    result.forEach((chat) => {
      chat.qualities = chat.qualities ? JSON.parse(chat.qualities) : [];
      chat.photos = chat.photos ? chat.photos.split(",") : [];
    });

    res.json(result);
  });
});

// 🔹 Ajouter un chat (Protégé)
router.post("/", verifyAdminToken, (req, res) => {
  const {
    nom,
    description,
    qualites,
    age,
    image,
    sexe,
    type_habitat,
    prix_adoption,
    photos,
  } = req.body;

  const qualitesStr = JSON.stringify(qualites);

  const sql =
    "INSERT INTO chats (nom, description, qualites, age, image, sexe, type_habitat, prix_adoption) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    sql,
    [
      nom,
      description,
      qualitesStr,
      age,
      image,
      sexe,
      type_habitat,
      prix_adoption,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const chatId = result.insertId;

      if (photos && photos.length > 0) {
        const photoValues = photos.map((url) => [chatId, url]);

        db.query(
          "INSERT INTO photos_chats (chat_id, url) VALUES ?",
          [photoValues],
          (photoErr) => {
            if (photoErr)
              return res.status(500).json({ error: photoErr.message });

            res.json({ message: "Chat ajouté avec ses photos !", chatId });
          }
        );
      } else {
        res.json({ message: "Chat ajouté sans photos !", chatId });
      }
    }
  );
});

// 🔹 Supprimer un chat (Protégé)
router.delete("/:id", verifyAdminToken, (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM photos_chats WHERE chat_id = ?", [id], (photoErr) => {
    if (photoErr) return res.status(500).json({ error: photoErr.message });

    db.query("DELETE FROM chats WHERE id = ?", [id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Chat supprimé !" });
    });
  });
});

module.exports = router;
