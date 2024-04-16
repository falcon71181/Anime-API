import type { RequestHandler } from "express";
import { scrapePopularAnime } from "../../scrapers/gogoanime/scrappers";

const getPopularAnimes: RequestHandler = async (req, res) => {
  try {
    const page = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;
    const data = await scrapePopularAnime(page);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getPopularAnimes };
