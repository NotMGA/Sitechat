const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  qualites: [{ type: String }], // Liste des qualités
  age: { type: Number, required: true },
  images: [{ type: String }], // URLs des images
  sexe: { type: String, enum: ["M", "F"], required: true },
  typeHome: { type: String, enum: ["Maison", "Appartement"], required: true },
  prixAdoption: { type: Number, required: true },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
