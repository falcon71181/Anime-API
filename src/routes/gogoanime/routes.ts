import { Router, type IRouter } from "express";
import { getRecentReleases, getNewSeasons, getPopularAnimes } from "../../controllers/gogoanime/controllers";

const gogoanime_router: IRouter = Router();

// /gogoanime/recent-releases
gogoanime_router.get("/recent-releases", getRecentReleases);

// /gogoanime/new-seasons
gogoanime_router.get("/new-seasons", getNewSeasons);

// /gogoanime/popular
gogoanime_router.get("/popular", getPopularAnimes);

export default gogoanime_router;
