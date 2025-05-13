const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // 👈 Mongoose now
const chatsRoutes = require("./routes/chats");
const adminRoutes = require("./routes/admin");

dotenv.config();
connectDB(); // 👈 Connexion MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chats", chatsRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`)
);
