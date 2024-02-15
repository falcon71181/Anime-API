import { Router, type IRouter } from "express";
import {
  getHomePageInfo,
  getAboutPageInfo,
  getSearchPageInfo,
  getCategoryPage,
} from "../../controllers/aniwatch/controllers";

const aniwatch_router: IRouter = Router();

// /aniwatch/
aniwatch_router.get("/", getHomePageInfo);

// /aniwatch/search?keyword=$(query)&page=$(page)
aniwatch_router.get("/search", getSearchPageInfo);

//  aniwatch/:category?page=${page}
aniwatch_router.get("/:category", getCategoryPage);

// /aniwatch/anime/:id
aniwatch_router.get("anime/:id", getAboutPageInfo);

export default aniwatch_router;
