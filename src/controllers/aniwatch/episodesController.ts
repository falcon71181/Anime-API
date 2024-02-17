import createHttpError from "http-errors";
import type { RequestHandler } from "express";
import { scrapeEpisodesPage } from "../../scrapers/aniwatch/scrapers";

const getEpisodesInfo: RequestHandler = async (req, res) => {
  try {
    const anime_id = req.params.id ? decodeURIComponent(req.params.id) : null;

    if (anime_id === null) {
      throw createHttpError.BadRequest("Anime Id Required");
    }

    const data = await scrapeEpisodesPage(anime_id);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getEpisodesInfo };
