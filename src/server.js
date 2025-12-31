import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";
import fetchArticles from "./services/articleFetcher.js";


const PORT = process.env.PORT || 5001;


(async () => {
  await connectDB();

  const testFetch = async () => {
  const articles = await fetchArticles();
  console.log("Latest 5 articles:", articles);
};

testFetch();


  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
