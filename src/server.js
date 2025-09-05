import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas
app.use("/auth", authRoutes);
app.use("/items", itemRoutes);

// rota de teste
app.get("/", (req, res) => {
  res.send("API rodando! 🚀");
});

// conecta ao MongoDB e inicia servidor
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB Atlas");
    app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error("Erro de conexão:", err));
