import { Router, type IRouter } from "express";
import {
  getHomePageInfo,
  getAboutPageInfo,
} from "../../controllers/aniwatch/controllers";

const aniwatch_router: IRouter = Router();

// /aniwatch/
aniwatch_router.get("/", getHomePageInfo);

// /aniwatch/:id
aniwatch_router.get("/:id", getAboutPageInfo);

export default aniwatch_router;
