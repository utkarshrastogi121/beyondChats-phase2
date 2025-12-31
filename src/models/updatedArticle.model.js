import mongoose from "mongoose";

const updatedArticleSchema = new mongoose.Schema(
  {
    sourceArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    title: String,
    rewrittenContent: String,
    references: [String],
    publishedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model(
  "UpdatedArticle",
  updatedArticleSchema,
  "updatedArticles"
);
