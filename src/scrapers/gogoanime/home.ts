import {
  URL_fn,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/gogoanime/constants";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import { extract_latest_episodes } from "../../extracters/gogoanime/extracters";
import { ScrapedHomePage } from "../../types/gogoanime/anime";

export const scrapeHomePage = async (
  page: number,
): Promise<ScrapedHomePage | HttpError> => {
  const URLs = await URL_fn();
  const res: ScrapedHomePage = {
    recentReleases: [],
  };
  try {
    const mainPage = await axios.get(
      `${URLs.AJAX}/page-recent-release.html?page=${page}`,
      {
        headers: {
          "User-Agent": USER_AGENT_HEADER,
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Accept: ACCEPT_HEADER,
        },
      },
    );

    const $: CheerioAPI = load(mainPage.data);

    const recentReleasesSelectors: SelectorType =
      "div.last_episodes.loaddub > ul > li";

    res.recentReleases = extract_latest_episodes(
      $,
      recentReleasesSelectors,
      URLs.BASE,
    );

    return res;
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
