import express from "express";
import cors from "cors";
import publisherRoutes from "./routes/publisher.routes.js";
import updatedArticleRoutes from "./routes/updatedArticle.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", publisherRoutes);
app.use("/api/updated-articles", updatedArticleRoutes);

export default app;
