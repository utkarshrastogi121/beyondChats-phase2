import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    link: { type: String, unique: true }
  },
  { timestamps: true }
);

export default mongoose.model("Article", articleSchema);
