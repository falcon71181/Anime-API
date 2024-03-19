import { Router, type IRouter } from "express";
import { getRecentReleases } from "../../controllers/gogoanime/controllers";

const gogoanime_router: IRouter = Router();

// /gogoanime/
gogoanime_router.get("/", getRecentReleases);

export default gogoanime_router;
