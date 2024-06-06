import {
  URL_fn,
} from "../../utils/gogoanime/constants";
import { headers } from "../../config/headers";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import { extract_top_airing } from "../../extracters/gogoanime/extracters";
import { TopAiring } from "../../types/gogoanime/anime";

export const scrapeTopAiring = async (
  page: number,
): Promise<TopAiring[] | HttpError> => {
  const URLs = await URL_fn();
  try {
    let res: TopAiring[] = [];
    const mainPage = await axios.get(
      `${URLs.AJAX}/page-recent-release-ongoing.html
?page=${page}`,
      {
        headers: {
          "User-Agent": headers.USER_AGENT_HEADER,
          "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
          Accept: headers.ACCEPT_HEADER,
        },
      },
    );

    const $: CheerioAPI = load(mainPage.data);

    const topAiringSelectors: SelectorType =
      "div.added_series_body.popular > ul > li";

    res = extract_top_airing(
      $,
      topAiringSelectors,
      URLs.BASE,
    );

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeTopAiring :", err); // for TESTING//
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

