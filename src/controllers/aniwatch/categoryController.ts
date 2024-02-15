import type { RequestHandler } from "express";
import { scrapeCategoryPage } from "../../scrapers/aniwatch/scrapers";

const getCategoryPage: RequestHandler = async (req, res) => {
  try {
    const category = req.params.category;
    const page = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;
    const data = await scrapeCategoryPage(category, page);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getCategoryPage };
