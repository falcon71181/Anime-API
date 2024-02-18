import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { scrapeEpisodeServersPage } from "../../scrapers/aniwatch/scrapers";

const getEpisodeServersInfo: RequestHandler = async (req, res) => {
  try {
    const episodeId = req.query.id
      ? decodeURIComponent(req.query?.id as string)
      : null;

    if (episodeId === null) {
      throw createHttpError.BadRequest("Episode Id required");
    }

    const data = await scrapeEpisodeServersPage(episodeId);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getEpisodeServersInfo };
