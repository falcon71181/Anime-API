import { scrapeHomePage } from "../../scrapers/aniwatch/scrapers";
import type { RequestHandler } from "express";

const getHomePageInfo: RequestHandler = async (_req, res) => {
  try {
    const data = await scrapeHomePage();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while fetching the home page information." });
  }
};

export { getHomePageInfo };
