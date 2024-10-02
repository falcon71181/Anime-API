import axios, { AxiosError } from "axios";
import { URL_fn } from "../../utils/gogoanime/constants";
import { headers } from "../../config/headers";
import { CheerioAPI, load, SelectorType } from "cheerio";
import { extract_home_info } from "../../extracters/gogoanime/extract_home_info";
import createHttpError, { HttpError } from "http-errors";
import { ScrapedHomePage } from "../../types/gogoanime/anime";

export const scrapeHomePage = async (): Promise<
  ScrapedHomePage | HttpError
> => {
  const URLs = await URL_fn();

  const mainPage = await axios.get(URLs.BASE, {
    headers: {
      "User-Agent": headers.USER_AGENT_HEADER,
      "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
      Accept: headers.ACCEPT_HEADER,
    },
  });

  const $: CheerioAPI = load(mainPage.data);
  const recent_releases: SelectorType =
    "#load_recent_release > div.last_episodes.loaddub > ul > li";

  try {
    let gg = extract_home_info($, recent_releases);
    return gg;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeHomePage :", err); // for TESTING//
    ////////////////////////////////////////////////////////////////

    if (err instanceof AxiosError) {
      throw createHttpError(
        err?.response?.status || 500,
        err?.response?.statusText || "Something went wrong",
      );
    } else {
      throw createHttpError.InternalServerError("Internal server error");
    }
  }
};
