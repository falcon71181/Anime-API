import {
  URL_fn,
} from "../../utils/gogoanime/constants";
import { headers } from "../../config/headers";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import { extract_latest_episodes } from "../../extracters/gogoanime/extracters";
import { RecentRelease } from "../../types/gogoanime/anime";

export const scrapeRecentReleases = async (
  page: number,
): Promise<RecentRelease[] | HttpError> => {
  const URLs = await URL_fn();
  try {
    let res: RecentRelease[] = [];
    const mainPage = await axios.get(
      `${URLs.AJAX}/page-recent-release.html?page=${page}`,
      {
        headers: {
          "User-Agent": headers.USER_AGENT_HEADER,
          "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
          Accept: headers.ACCEPT_HEADER,
        },
      },
    );

    const $: CheerioAPI = load(mainPage.data);

    const recentReleasesSelectors: SelectorType =
      "div.last_episodes.loaddub > ul > li";

    res = extract_latest_episodes(
      $,
      recentReleasesSelectors,
      URLs.BASE,
    );

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeRecentReleases :", err); // for TESTING//
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
