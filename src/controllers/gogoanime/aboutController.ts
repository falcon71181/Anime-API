import { scrapeAboutPage } from "../../scrapers/gogoanime/about";
import type { RequestHandler } from "express";

const getAboutPageInfo: RequestHandler = async (req, res) => {
  try {
    const id: string = req.params.id;
    const data = await scrapeAboutPage(id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: "An error occurred while fetching the about page information." });
  }
};

export { getAboutPageInfo };
