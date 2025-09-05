import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  done: { type: Boolean, default: false },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
