import { Router, type IRouter } from "express";
import { getRecentReleases, getNewSeasons, getPopularAnimes, getAnimeMovies } from "../../controllers/gogoanime/controllers";

const gogoanime_router: IRouter = Router();

// /gogoanime.
gogoanime_router.get("/", (_req, res) => {
  res.redirect("/");
}); // TODO: make custom gogoanime api docs API

// /gogoanime/recent-releases
gogoanime_router.get("/recent-releases", getRecentReleases);

// /gogoanime/new-seasons
gogoanime_router.get("/new-seasons", getNewSeasons);

// /gogoanime/popular
gogoanime_router.get("/popular", getPopularAnimes);

// /gogoanime/anime-movies
gogoanime_router.get("/anime-movies", getAnimeMovies);

export default gogoanime_router;
