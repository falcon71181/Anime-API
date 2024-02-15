import {
  URLs,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/aniwatch/constants";
import createHttpError, { HttpError } from "http-errors";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import {
  extract_searched_animes,
  extract_mostpopular_animes,
} from "../../extracters/aniwatch/extracters";
import { ScrapedSearchPage } from "../../types/aniwatch/anime";

export const scrapeSearchPage = async (
  query: string,
  page: number,
): Promise<ScrapedSearchPage | HttpError> => {
  const res: ScrapedSearchPage = {
    animes: [],
    mostPopularAnimes: [],
    // currentPage: page,
    // hasNextPage: false,
    // totalPages: 1,
  };

  try {
    const mainPage = await axios.get(
      `${URLs.SEARCH}?keyword=${query}&page=${page}`,
      {
        headers: {
          "User-Agent": USER_AGENT_HEADER,
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Accept: ACCEPT_HEADER,
        },
      },
    );
    const $: CheerioAPI = load(mainPage.data);

    const selectors: SelectorType =
      "#main-content .tab-content .film_list-wrap .flw-item";
    const mostPopularAnimesSelectors: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-realtime .anif-block-ul ul li";

    res.animes = extract_searched_animes($, selectors);
    res.mostPopularAnimes = extract_mostpopular_animes(
      $,
      mostPopularAnimesSelectors,
    );

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeSearchPage :", err); // for TESTING//
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
