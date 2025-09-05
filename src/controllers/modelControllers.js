import Model from "../models/Model.js";

// criar item
export const createItem = async (req, res) => {
  try {
    const { title } = req.body;
    const item = new Model({ title, owner: req.userId });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// listar todos do usuário
export const getItems = async (req, res) => {
  try {
    const items = await Model.find({ owner: req.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// pegar item por id
export const getItemById = async (req, res) => {
  try {
    const item = await Model.findOne({ _id: req.params.id, owner: req.userId });
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// atualizar item
export const updateItem = async (req, res) => {
  try {
    const item = await Model.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// deletar item
export const deleteItem = async (req, res) => {
  try {
    const item = await Model.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!item) return res.status(404).json({ message: "Item não encontrado" });
    res.json({ message: "Item deletado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
