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

// aniwatch, hianime, zoro
router.use("/aniwatch", aniwatch_router);
router.use("/hianime", aniwatch_router);
router.use("/zoro", aniwatch_router);

// gogoanime, anitaku
router.use("/gogoanime", gogoanime_router);
router.use("/anitaku", gogoanime_router);

export { router };
