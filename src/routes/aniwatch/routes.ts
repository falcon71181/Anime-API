import { Router, type IRouter } from "express";
import { getHomeInfo } from "../../controllers/aniwatch/controllers";

const aniwatch_router: IRouter = Router();

// /aniwatch/
aniwatch_router.get("/", getHomeInfo);

export default aniwatch_router;
