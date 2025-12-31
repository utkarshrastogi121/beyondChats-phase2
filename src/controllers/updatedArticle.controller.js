import Phase1Article from "../models/phase1Article.model.js";
import UpdatedArticle from "../models/updatedArticle.model.js";

import googleSearch from "../services/googleSearch.js";
import scrapeContent from "../services/contentScraper.js";
import rewriteArticle from "../services/aiRewriter.js";

export const rewriteAndSaveController = async (req, res) => {
  try {
    const articles = await Phase1Article.find()
      .sort({ createdAt: -1 })
      .limit(5);

    if (!articles.length) {
      return res.status(404).json({ message: "No Phase 1 articles found" });
    }

    const updatedArticles = [];

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

      const updatedArticle = await UpdatedArticle.create({
        title: article.title,
        originalArticleId: article._id,
        originalContent: article.content,
        rewrittenContent,
        references: [
          { title: references[0].title, link: references[0].link },
          { title: references[1].title, link: references[1].link },
        ],
      });

      updatedArticles.push(updatedArticle);
    }

    res.json({
      status: "success",
      updatedArticles,
    });
  } catch (err) {
    console.error("Rewrite & Save Error:", err);
    res.status(500).json({ error: err.message });
  }
};
