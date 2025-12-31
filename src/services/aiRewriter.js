import groq from "../config/llm.js";
import limiter from "../config/limiter.js";
import { getCache, setCache } from "../utils/cache.js";

const rewriteArticle = async (original, ref1, ref2) =>
  limiter.schedule(async () => {
    original = original || "";
    ref1 = ref1 || "";
    ref2 = ref2 || "";

    const normalized = original
      .toLowerCase()
      .replace(/\s+/g, " ")
      .slice(0, 500);

    const cacheKey = `phase2:rewrite:${Buffer.from(normalized).toString(
      "base64"
    )}`;

    const cached = await getCache(cacheKey);
    if (cached) return cached;

    const prompt = `
You are an SEO content writer.

Original article:
${original}

Reference Article 1:
${ref1}

Reference Article 2:
${ref2}

Task:
Rewrite the original article.
- Match tone & structure of reference articles
- Improve readability
- Do NOT copy sentences
- Keep facts accurate
- Use headings and bullet points
- Length: 800-1200 words
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rewritten = response.choices[0]?.message?.content || "";

    console.log("Rewritten: ", rewritten);

    await setCache(cacheKey, rewritten, 86400);

    return rewritten;
  });

export default rewriteArticle;
