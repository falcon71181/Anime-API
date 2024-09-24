import { scrapeSearchPage } from "../../scrapers/gogoanime/search";
import createHttpError from "http-errors";
import type { RequestHandler } from "express";

const getSearchPageInfo: RequestHandler = async (req, res) => {
  try {
    const page: number = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;
    const keyword: string | null = req.query.keyword
      ? decodeURIComponent(req.query.keyword as string)
      : null;

    if (keyword === null) {
      throw createHttpError.BadRequest("Search keyword required");
    }

    const data = await scrapeSearchPage(keyword, page);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getSearchPageInfo };
