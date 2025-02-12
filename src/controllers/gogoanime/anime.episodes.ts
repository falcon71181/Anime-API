import { scrapeEpisodePage } from "../../scrapers/gogoanime/scrappers";
import type { RequestHandler } from "express";

const getAnimeEpisodes: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const data = await scrapeEpisodePage(id);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getAnimeEpisodes };
