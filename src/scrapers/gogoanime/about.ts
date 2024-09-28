import axios, { AxiosError } from "axios";
import { URL_fn } from "../../utils/gogoanime/constants";
import { headers } from "../../config/headers";
import { CheerioAPI, load, SelectorType } from "cheerio";
import { extract_about_info } from "../../extracters/gogoanime/about_anime";
import createHttpError, { HttpError } from "http-errors";
import { AboutAnimeInfo } from "../../types/gogoanime/anime";
import { ScrapedAboutPage } from "../../types/gogoanime/about";

export const scrapeAboutPage = async (
  id: string
): Promise<ScrapedAboutPage | HttpError> => {
  const defaultInfo: AboutAnimeInfo = {
    name: null,
    img: null,
    type: null,
    genre: null,
    status: null,
    aired_in: null,
    other_name: null,
    episodes: null,
  };

  const res: ScrapedAboutPage = {
    id: id,
    info: defaultInfo,
  };

  const URLs = await URL_fn();
  const aboutURL: string = new URL(id, URLs.CATEGORY).toString();

  const mainPage = await axios.get(aboutURL, {
    headers: {
      "User-Agent": headers.USER_AGENT_HEADER,
      "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
      Accept: headers.ACCEPT_HEADER,
    },
  });

  const $: CheerioAPI = load(mainPage.data);
  const selectors: SelectorType = ".main_body";

  try {
    res.info = extract_about_info($, selectors);
    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeAboutPage :", err); // for TESTING//
    ////////////////////////////////////////////////////////////////

    if (err instanceof AxiosError) {
      throw createHttpError(
        err?.response?.status || 500,
        err?.response?.statusText || "Something went wrong"
      );
    } else {
      throw createHttpError.InternalServerError("Internal server error");
    }
  }
};
