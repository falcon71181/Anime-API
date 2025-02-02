import { URL_fn } from "../../utils/gogoanime/constants";
import { headers } from "../../config/headers";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import { extract_completed_animes } from "../../extracters/gogoanime/extracters";
import { CompletedAnime } from "../../types/gogoanime/anime";

export const scrapeCompletedAnime = async (
  page: number,
): Promise<CompletedAnime[] | HttpError> => {
  const URLs = await URL_fn();
  try {
    let res: CompletedAnime[] = [];
    const mainPage = await axios.get(`${URLs.POPULAR}?page=${page}`, {
      headers: {
        "User-Agent": headers.USER_AGENT_HEADER,
        "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
        Accept: headers.ACCEPT_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);

    const popularAnimesSelectors: SelectorType = "div.last_episodes > ul > li";

    res = extract_completed_animes($, popularAnimesSelectors, URLs.BASE);

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeCompletedAnime :", err); // for TESTING//
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
