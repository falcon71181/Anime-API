import type { RequestHandler } from "express";
import { scrapeHomePage } from "../../scrapers/gogoanime/home";

const getHomePage: RequestHandler = async (req, res) => {
  try {
    const page = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;
    const data = await scrapeHomePage(page);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getHomePage };
