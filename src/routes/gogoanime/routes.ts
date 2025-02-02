import { Router, type IRouter } from "express";
import {
  getRecentReleases,
  getNewSeasons,
  getPopularAnimes,
  getCompletedAnimes,
  getAnimeMovies,
  getTopAiring,
  getHomePageInfo,
  getAboutPageInfo,
  getSearchPageInfo,
} from "../../controllers/gogoanime/controllers";
import { cacheManager } from "../../middlewares/cache";

const gogoanime_router: IRouter = Router();

// /gogoanime.
gogoanime_router.get("/", (_req, res) => {
  res.redirect("/");
}); // TODO: make custom gogoanime api docs API

// /gogoanime/home
gogoanime_router.get("/home", cacheManager.middleware(), getHomePageInfo);

// /gogoanime/search?keyword=${query}&page=${page}
gogoanime_router.get(
  "/search",
  cacheManager.middleware({
    duration: 3600, // 1 hour cache
    keyParams: ["keyword", "page"],
  }),
  getSearchPageInfo,
);

// /gogoanime/anime/:id
gogoanime_router.get("/anime/:id", cacheManager.middleware(), getAboutPageInfo);

// /gogoanime/recent-releases?page=${pageNo}
gogoanime_router.get(
  "/recent-releases",
  cacheManager.middleware({
    duration: 3600 * 24 * 31, // 1 month cache
    keyParams: ["page"],
  }),
  getRecentReleases,
);

// /gogoanime/new-seasons?page=${pageNo}
gogoanime_router.get(
  "/new-seasons",
  cacheManager.middleware({
    duration: 3600 * 24, // 1 day cache
    keyParams: ["page"],
  }),
  getNewSeasons,
);

// /gogoanime/popular?page=${pageNo}
gogoanime_router.get(
  "/popular",
  cacheManager.middleware({
    duration: 3600 * 24, // 1 day cache
    keyParams: ["page"],
  }),
  getPopularAnimes,
);

// /gogoanime/complete?page=${pageNo} d
gogoanime_router.get(
  "/completed",
  cacheManager.middleware({
    duration: 3600 * 24, // 1 day cache
    keyParams: ["page"],
  }),
  getCompletedAnimes,
);

// /gogoanime/anime-movies?page=${pageNo}
gogoanime_router.get(
  "/anime-movies",
  cacheManager.middleware({
    duration: 3600 * 24, // 1 day cache
    keyParams: ["page"],
  }),
  getAnimeMovies,
);

// /gogoanime/top-airing?page=${pageNo}
gogoanime_router.get(
  "/top-airing",
  cacheManager.middleware({
    duration: 3600 * 24, // 1 day cache
    keyParams: ["page"],
  }),
  getTopAiring,
);

export default gogoanime_router;
