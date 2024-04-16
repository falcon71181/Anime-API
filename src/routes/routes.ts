import aniwatch_router from "./aniwatch/routes";
import gogoanime_router from "./gogoanime/routes";
import { getRoot } from "../lib/getRoot";
import { Router, type IRouter } from "express";

const router: IRouter = Router();

// /
router.get("/", getRoot);

// health check API
router.get("/health", (_req, res) => {
  res.sendStatus(200);
});

// aniwatch
router.use("/aniwatch", aniwatch_router);

// gogoanime
router.use("/gogoanime", gogoanime_router);

export { router };
