import axios from "axios";

const PHASE1_BASE_URL = process.env.PHASE1_API;

export const fetchArticles = async () => {
  const { data } = await axios.get(`${PHASE1_BASE_URL}/articles`);
  return data;
};

export const publishArticleToPhase1 = async (article) => {
  const { data } = await axios.post(
    `${PHASE1_BASE_URL}/articles`,
    article
  );
  return data;
};
