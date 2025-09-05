import express from "express";
import { register, login, refreshToken, me, deleteUserById, getUsers } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateRegister, validateLogin } from "../middlewares/validate.js";

const router = express.Router();

// rotas de autenticação
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/refresh", refreshToken);
router.get("/me", authenticate, me);
router.delete("/:id", authenticate, deleteUserById);
router.get("/", authenticate, getUsers);  


export default router;
