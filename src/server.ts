import express from "express";
import { config } from "dotenv";
import { aniwatch_router } from "./routes/routes";
import { getRoot } from "./lib/getRoot";
import { limiter } from "./middlewares/rateLimit";

config(); // dotenv

const app = express();
const PORT = process.env.PORT ?? 3001;

//middlewares
app.use(limiter);

// /
app.get("/", getRoot);

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// AniWatch.to
app.use("/aniwatch", aniwatch_router);

app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});

export default app;
