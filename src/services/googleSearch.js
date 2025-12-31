import axios from "../config/axios.js";
import limiter from "../config/limiter.js";
import { SERP_API_URL } from "../config/serpapi.js";
import { getCache, setCache } from "../utils/cache.js";

const googleSearch = async (query) =>
  limiter.schedule(async () => {
    const cacheKey = `phase2:search:${query}`;

    const cached = await getCache(cacheKey);
    if (cached) return cached;

    const response = await axios.get(SERP_API_URL, {
      params: {
        q: query,
        api_key: process.env.SERP_API_KEY,
        num: 5
      }
    });

    const results = response.data.organic_results
      .filter(r => r.link && !r.link.includes("beyondchats"))
      .slice(0, 2);

    await setCache(cacheKey, results, 86400); // 24h
    return results;
  });

export default googleSearch;
