import Phase1Article from "../models/phase1Article.model.js";
import UpdatedArticle from "../models/updatedArticle.model.js";

import googleSearch from "../services/googleSearch.js";
import scrapeContent from "../services/contentScraper.js";
import rewriteArticle from "../services/aiRewriter.js";

export const rewriteAndPublishController = async (req, res) => {
  try {
    const articles = await Phase1Article.find()
      .sort({ createdAt: -1 })
      .limit(5);

    if (!articles.length) {
      return res.status(404).json({
        success: false,
        message: "No Phase 1 articles found",
      });
    }

    const bulkOps = [];

    for (const article of articles) {
      const references = await googleSearch(article.title);
      if (references.length < 2) continue;

      const ref1 = await scrapeContent(references[0].link);
      const ref2 = await scrapeContent(references[1].link);

      const rewrittenContent = await rewriteArticle(
        article.content,
        ref1,
        ref2
      );

      bulkOps.push({
        updateOne: {
          filter: { originalArticleId: article._id },
          update: {
            $set: {
              title: article.title,
              originalArticleId: article._id,
              originalContent: article.content,
              rewrittenContent,
              references: references.slice(0, 2),
              updatedAt: new Date(),
            },
          },
          upsert: true,
        },
      });
    }

    if (!bulkOps.length) {
      return res.status(400).json({
        success: false,
        message: "No articles qualified for rewriting",
      });
    }

    const result = await UpdatedArticle.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      payload: {
        modified: result.modifiedCount,
        upserted: result.upsertedCount,
      },
    });
  } catch (err) {
    console.error("Rewrite & Save Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUpdatedArticlesController = async (req, res) => {
  try {
    const articles = await UpdatedArticle.find()
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      data: articles,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch updated articles",
    });
  }
};
