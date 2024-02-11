import { Router, type IRouter } from "express";
import { getHomeInfo } from "../../controllers/aniwatch/homeController";

const router: IRouter = Router();

// /aniwatch/
router.get("/", getHomeInfo);

export default router;
