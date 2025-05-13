const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const verifyAdminToken = require("../middleware/auth");

// 🔹 Récupérer tous les chats
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Ajouter un chat
router.post("/", verifyAdminToken, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    await chat.save();
    res.status(201).json({ message: "Chat ajouté", chat });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Supprimer un chat
router.delete("/:id", verifyAdminToken, async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.json({ message: "Chat supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
