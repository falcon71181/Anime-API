import express from "express";
import { config } from "dotenv";
import { aniwatch_router } from "./routes/routes";

config(); // dotenv

const app = express();
const PORT = process.env.PORT ?? 3001;

// /
app.get("/", (_, res) => res.redirect("/health"));

app.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// AniWatch.to
app.use("/aniwatch", aniwatch_router);

app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});

export default app;
