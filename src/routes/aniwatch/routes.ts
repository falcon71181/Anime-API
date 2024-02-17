import { Router, type IRouter } from "express";
import {
  getHomePageInfo,
  getAboutPageInfo,
  getSearchPageInfo,
  getCategoryPage,
  getEpisodesInfo,
} from "../../controllers/aniwatch/controllers";

const aniwatch_router: IRouter = Router();

// /aniwatch/
aniwatch_router.get("/", getHomePageInfo);

// /aniwatch/search?keyword=$(query)&page=$(page)
aniwatch_router.get("/search", getSearchPageInfo);

// /aniwatch/anime/:id
aniwatch_router.get("/anime/:id", getAboutPageInfo);

// /aniwatch/episodes/:id
aniwatch_router.get("/episodes/:id", getEpisodesInfo);

//  aniwatch/:category?page=${page}
aniwatch_router.get("/:category", getCategoryPage);

export default aniwatch_router;
