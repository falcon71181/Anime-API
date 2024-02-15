import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import {
  URLs,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/aniwatch/constants";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import {
  extract_genre_list,
  extract_top10_animes,
  extract_category_animes,
} from "../../extracters/aniwatch/extracters";
import { ScrapedCategoryPage } from "../../types/aniwatch/anime";

export const scrapeCategoryPage = async (
  category: string,
  page: number,
): Promise<ScrapedCategoryPage | HttpError> => {
  const res: ScrapedCategoryPage = {
    animes: [],
    top10Animes: {
      day: [],
      week: [],
      month: [],
    },
    category,
    genres: [],
    // currentPage: Number(page),
    // hasNextPage: false,
    // totalPages: 1,
  };

  try {
    const scrapeUrl = new URL(category, URLs.BASE);

    const mainPage = await axios.get(`${scrapeUrl}?page=${page}`, {
      headers: {
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        Accept: ACCEPT_HEADER,
      },
    });

    const $: CheerioAPI = load(mainPage.data);
    const selectors: SelectorType =
      "#main-content .tab-content .film_list-wrap .flw-item";
    const categorySelectors: SelectorType =
      "#main-content .block_area .block_area-header .cat-heading";
    const top10Selectors: SelectorType =
      '#main-sidebar .block_area-realtime [id^="top-viewed-"]';
    const genresSelectors: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-genres .sb-genre-list li";

    res.category = $(categorySelectors)?.text()?.trim() ?? category;
    res.animes = extract_category_animes($, selectors);
    res.genres = extract_genre_list($, genresSelectors);

    $(top10Selectors).each((_index, element) => {
      const periodType = $(element).attr("id")?.split("-")?.pop()?.trim();
      if (periodType === "day") {
        res.top10Animes.day = extract_top10_animes($, periodType);
        return;
      }
      if (periodType === "week") {
        res.top10Animes.week = extract_top10_animes($, periodType);
        return;
      }
      if (periodType === "month") {
        res.top10Animes.month = extract_top10_animes($, periodType);
      }
    });

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeCategoryPage :", err); // for TESTING//
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

export default scrapeCategoryPage;
