import User from "../models/User.js";
import { createTokens } from "../utils/token.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email já cadastrado" });

    const user = new User({ name, email, password });
    await user.save();

    const tokens = createTokens(user._id);
    res.status(201).json({ user: { id: user._id, name, email }, ...tokens });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Senha incorreta" });

    const tokens = createTokens(user._id);
    res.json({ user: { id: user._id, name: user.name, email }, ...tokens });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token ausente" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const tokens = createTokens(user._id);
    res.json(tokens);
  } catch (err) {
    res.status(401).json({ message: "Refresh token inválido ou expirado" });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.userId !== id) return res.status(403).json({ message: "Acesso negado" });

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // nunca enviar a senha
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
