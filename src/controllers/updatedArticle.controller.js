import Phase1Article from "../models/phase1Article.model.js";
import UpdatedArticle from "../models/updatedArticle.model.js";

import googleSearch from "../services/googleSearch.js";
import scrapeContent from "../services/contentScraper.js";
import rewriteArticle from "../services/aiRewriter.js";

export const rewriteAndSaveController = async (req, res) => {
    console.log("🔥 rewriteAndSaveController HIT");
  try {
    // 1️⃣ Fetch latest 5 Phase 1 articles
    const articles = await Phase1Article.find()
      .sort({ createdAt: -1 })
      .limit(5);

    if (!articles.length) {
      return res.status(404).json({ message: "No Phase 1 articles found" });
    }

    const updatedArticles = [];

    // 2️⃣ Loop through each article
    for (const article of articles) {
      // Google search for references
      const references = await googleSearch(article.title);
      if (references.length < 2) continue; // skip if not enough references

      // Scrape reference content
      const ref1 = await scrapeContent(references[0].link);
      const ref2 = await scrapeContent(references[1].link);

      // Rewrite using AI
      const rewrittenContent = await rewriteArticle(
        article.content,
        ref1,
        ref2
      );

      // Save into UpdatedArticle
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

    console.log("updated articles controller:", updatedArticles);

    res.json({
      status: "success",
      updatedArticles,
    });
  } catch (err) {
    console.error("Rewrite & Save Error:", err);
    res.status(500).json({ error: err.message });
  }
};
