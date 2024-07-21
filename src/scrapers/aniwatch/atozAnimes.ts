import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import {
  URL_fn,
} from "../../utils/aniwatch/constants";
import { headers } from "../../config/headers";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import {
  extract_atoz_animes
} from "../../extracters/aniwatch/extracters";
import { Anime } from "../../types/aniwatch/anime";

export const scrapeatozAnimes = async (
  page: number,
): Promise<Anime[] | HttpError> => {
  let res: Anime[] = [];

  try {
    const URLs = await URL_fn();
    const scrapeUrl = new URL("az-list", URLs.BASE);

    const mainPage = await axios.get(`${scrapeUrl}/?page=${page}`, {
      headers: {
        "User-Agent": headers.USER_AGENT_HEADER,
        "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
        Accept: headers.ACCEPT_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);
    const selectors: SelectorType =
      "#main-wrapper div div.page-az-wrap section div.tab-content div div.film_list-wrap .flw-item";
    res = extract_atoz_animes($, selectors);

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeatozAnimes :", err); // for TESTING//
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

export default scrapeatozAnimes;
