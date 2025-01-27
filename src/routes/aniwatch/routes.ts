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

const aniwatch_router: IRouter = Router();

// /aniwatch/
aniwatch_router.get("/", getHomePageInfo);

// aniwatch/az-list
aniwatch_router.get("/az-list", getatozPage);

// /aniwatch/search?keyword=$(query)&page=$(page)
aniwatch_router.get("/search", getSearchPageInfo);

// /aniwatch/anime/:id
aniwatch_router.get("/anime/:id", getAboutPageInfo);

// /aniwatch/episodes/:id
aniwatch_router.get("/episodes/:id", getEpisodesInfo);

// /aniwatch/servers?id=${id}
aniwatch_router.get("/servers", getEpisodeServersInfo);

// /aniwatch/episode-srcs?id=${episodeId}?server=${server}&category=${category (dub or sub)}
aniwatch_router.get("/episode-srcs", getAnimeEpisodeSourcesInfo);

//  aniwatch/:category?page=${page}
aniwatch_router.get("/:category", getCategoryPage);

export default aniwatch_router;
