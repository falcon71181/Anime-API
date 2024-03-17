import { Router, type IRouter } from "express";
import { getHomePage } from "../../controllers/gogoanime/controllers";

const gogoanime_router: IRouter = Router();

// /gogoanime/
gogoanime_router.get("/", getHomePage);

export default getHomePage;
