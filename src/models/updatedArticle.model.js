import mongoose from "mongoose";

const updatedArticleSchema = new mongoose.Schema(
  {
    originalArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phase1Article",
      required: true,
      unique: true,
    },

    title: String,
    originalContent: String,
    rewrittenContent: String,

    references: [
      {
        title: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("UpdatedArticle", updatedArticleSchema);
