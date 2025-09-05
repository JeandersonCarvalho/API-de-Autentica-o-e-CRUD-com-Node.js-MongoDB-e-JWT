import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
} from "../controllers/modelControllers.js";
import { validateItem } from "../middlewares/validate.js";

const router = express.Router();

router.use(authenticate);
router.post("/", validateItem, createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", validateItem, updateItem);
router.delete("/:id", deleteItem);

export default router;
