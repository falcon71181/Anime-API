import { Router, type IRouter } from "express";
import {
  getHomePageInfo,
  getAboutPageInfo,
  getSearchPageInfo,
  getCategoryPage,
  getEpisodesInfo,
  getEpisodeServersInfo,
  getAnimeEpisodeSourcesInfo,
  getatozPage,
} from "../../controllers/aniwatch/controllers";
import cacheMiddleware from "../../middlewares/cache";

const aniwatch_router: IRouter = Router();

// /aniwatch/
aniwatch_router.get("/", cacheMiddleware, getHomePageInfo);

// aniwatch/az-list
aniwatch_router.get("/az-list", cacheMiddleware, getatozPage);

// /aniwatch/search?keyword=$(query)&page=$(page)
aniwatch_router.get("/search", cacheMiddleware, getSearchPageInfo);

// /aniwatch/anime/:id
aniwatch_router.get("/anime/:id", cacheMiddleware, getAboutPageInfo);

// /aniwatch/episodes/:id
aniwatch_router.get("/episodes/:id", cacheMiddleware, getEpisodesInfo);

// /aniwatch/servers?id=${id}
aniwatch_router.get("/servers", cacheMiddleware, getEpisodeServersInfo);

// /aniwatch/episode-srcs?id=${episodeId}?server=${server}&category=${category (dub or sub)}
aniwatch_router.get("/episode-srcs", cacheMiddleware, getAnimeEpisodeSourcesInfo);

//  aniwatch/:category?page=${page}
aniwatch_router.get("/:category", cacheMiddleware, getCategoryPage);

export default aniwatch_router;
