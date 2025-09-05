import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado ao MongoDB Atlas");
  } catch (err) {
    console.error("❌ Erro de conexão:", err);
    process.exit(1);
  }
};
