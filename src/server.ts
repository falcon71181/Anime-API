import express from "express";
import { config } from "dotenv";
import router from "./routes/routes";

config();

const app = express();
const PORT = process.env.PORT ?? 3001;

router.get("/health", (_req, res) => {
  res.sendStatus(200);
});

app.use("/aniwatch", router);

app.listen(PORT, () => {
  console.log(`⚔️  API started ON PORT : ${PORT} @ STARTED  ⚔️`);
});
