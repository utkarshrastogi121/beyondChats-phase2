import axios from "axios";

const PHASE1_API = process.env.PHASE1_API_URL;

const publishArticle = async (article) => {
  const { data } = await axios.post(
    `${PHASE1_API}/api/updated-articles`,
    article
  );
  return data;
};

export default publishArticle;
