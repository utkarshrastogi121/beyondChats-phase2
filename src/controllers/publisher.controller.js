import Phase1Article from "../models/phase1Article.model.js";
import UpdatedArticle from "../models/updatedArticle.model.js";

import googleSearch from "../services/googleSearch.js";
import scrapeContent from "../services/contentScraper.js";
import rewriteArticle from "../services/aiRewriter.js";

export const rewriteAndPublishController  = async (req, res) => {
  console.log("🔥 rewriteAndPublishController HIT");
  try {
    // 1️⃣ Fetch latest 5 Phase 1 articles
    const articles = await Phase1Article.find()
      .sort({ createdAt: -1 })
      .limit(5);

    if (!articles.length) {
      return res.status(404).json({ message: "No Phase 1 articles found" });
    }

    // 2️⃣ Prepare bulk operations
    const bulkOps = [];

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

      // 3️⃣ Add bulkWrite operation (update if exists, otherwise insert)
      bulkOps.push({
        updateOne: {
          filter: { originalArticleId: article._id },
          update: {
            $set: {
              title: article.title,
              originalContent: article.content,
              rewrittenContent,
              references: [
                { title: references[0].title, link: references[0].link },
                { title: references[1].title, link: references[1].link },
              ],
              updatedAt: new Date(),
            },
          },
          upsert: true, // creates a new document if not exists
        },
      });
    }

    // 4️⃣ Execute all updates in bulk
    const result = await UpdatedArticle.bulkWrite(bulkOps);

    res.json({
      status: "success",
      message: `Updated ${result.modifiedCount} articles, upserted ${result.upsertedCount}`,
    });
  } catch (err) {
    console.error("Rewrite & Save Error:", err);
    res.status(500).json({ error: err.message });
  }
};
