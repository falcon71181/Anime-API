import { scrapeAboutPage } from "../../scrapers/aniwatch/about";
import type { RequestHandler } from "express";

const getAboutPageInfo: RequestHandler = async (req, res) => {
  try {
    const data = await scrapeAboutPage(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getAboutPageInfo };
