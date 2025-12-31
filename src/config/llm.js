import Groq from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  console.error("ENV AT RUNTIME:", process.env);
  throw new Error("❌ GROQ_API_KEY not loaded");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default groq;
