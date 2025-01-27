import { Router, type IRouter } from "express";
import {
  getRecentReleases,
  getNewSeasons,
  getPopularAnimes,
  getAnimeMovies,
  getTopAiring,
  getHomePageInfo,
  getAboutPageInfo,
  getSearchPageInfo,
} from "../../controllers/gogoanime/controllers";
import cacheMiddleware from "../../middlewares/cache";

const gogoanime_router: IRouter = Router();

// /gogoanime.
gogoanime_router.get("/", cacheMiddleware, (_req, res) => {
  res.redirect("/");
}); // TODO: make custom gogoanime api docs API

// /gogoanime/home
gogoanime_router.get("/home", cacheMiddleware, getHomePageInfo);

// /gogoanime/search?keyword=${query}&page=${page}
gogoanime_router.get("/search", cacheMiddleware, getSearchPageInfo);

// /gogoanime/anime/:id
gogoanime_router.get("/anime/:id", cacheMiddleware, getAboutPageInfo);

// /gogoanime/recent-releases
gogoanime_router.get("/recent-releases", cacheMiddleware, getRecentReleases);

// /gogoanime/new-seasons
gogoanime_router.get("/new-seasons", cacheMiddleware, getNewSeasons);

// /gogoanime/popular
gogoanime_router.get("/popular", cacheMiddleware, getPopularAnimes);

// /gogoanime/anime-movies
gogoanime_router.get("/anime-movies", cacheMiddleware, getAnimeMovies);

// /gogoanime/top-airing
gogoanime_router.get("/top-airing", cacheMiddleware, getTopAiring);

export default gogoanime_router;
