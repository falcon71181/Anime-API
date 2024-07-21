import type { RequestHandler } from "express";
import { scrapeatozAnimes } from "../../scrapers/aniwatch/scrapers";

const getatozPage: RequestHandler = async (req, res) => {
  try {
    const page = req.query.page
      ? Number(decodeURIComponent(req.query?.page as string))
      : 1;
    const data = await scrapeatozAnimes(page);
    res.status(200).json(data);
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getatozPage };
