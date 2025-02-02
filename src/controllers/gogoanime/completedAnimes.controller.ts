import type { RequestHandler } from "express";
import { scrapeCompletedAnime } from "../../scrapers/gogoanime/scrappers";

const getCompletedAnimes: RequestHandler = async (req, res) => {
  try {
    const page = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;
    const data = await scrapeCompletedAnime(page);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getCompletedAnimes };
