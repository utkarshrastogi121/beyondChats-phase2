import Phase1Article from "../models/phase1Article.model.js";
import { getCache, setCache } from "../utils/cache.js";

const fetchArticles = async () => {
  const cacheKey = "phase2:latest5";

  const cached = await getCache(cacheKey);
  if (cached && cached.length) return cached;

  const articles = await Phase1Article.find();

  await setCache(cacheKey, articles, 300);
  return articles;
};


export default fetchArticles;
