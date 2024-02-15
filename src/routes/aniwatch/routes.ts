import { Router, type IRouter } from "express";
import {
  getHomePageInfo,
  getAboutPageInfo,
  getSearchPageInfo,
} from "../../controllers/aniwatch/controllers";

const aniwatch_router: IRouter = Router();

// /aniwatch/
aniwatch_router.get("/", getHomePageInfo);

// /aniwatch/search?keyword=$(query)&page=$(page)
aniwatch_router.get("/search", getSearchPageInfo);

// /aniwatch/:id
aniwatch_router.get("/:id", getAboutPageInfo);

export default aniwatch_router;
