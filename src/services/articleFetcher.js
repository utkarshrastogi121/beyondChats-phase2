// services/fetchArticles.js
import Phase1Article from "../models/phase1Article.model.js";
import { getCache, setCache } from "../utils/cache.js";

const fetchArticles = async () => {
  const cacheKey = "phase2:latest5";

  const cached = await getCache(cacheKey);
  console.log("Cached articles:", cached);
  if (cached && cached.length) return cached;

  const articles = await Phase1Article.find();
  console.log("Articles from DB:", articles);

  await setCache(cacheKey, articles, 300);
  return articles;
};


export default fetchArticles;
