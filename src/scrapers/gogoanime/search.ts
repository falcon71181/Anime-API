import createHttpError, { HttpError } from "http-errors";
import { ScrapedSearchPage } from "../../types/gogoanime/search";
import { URL_fn } from "../../utils/gogoanime/constants";
import axios, { AxiosError } from "axios";
import { headers } from "../../config/headers";
import { CheerioAPI, load, SelectorType } from "cheerio";
import { extract_searched_animes } from "../../extracters/gogoanime/searched_animes";

export const scrapeSearchPage = async (
  query: string,
  page: number
): Promise<ScrapedSearchPage | HttpError> => {
  const res: ScrapedSearchPage = {
    animes: [],
    currentPage: Number(page),
    hasNextPage: false,
    totalPages: 1,
  };

  try {
    const URLs = await URL_fn();
    const mainPage = await axios.get(
      `${URLs.SEARCH}?keyword=${query}&page=${page}`,
      {
        headers: {
          "User-Agent": headers.USER_AGENT_HEADER,
          "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
          Accept: headers.ACCEPT_HEADER,
        },
      }
    );

    const $: CheerioAPI = load(mainPage.data);

    const selectors: SelectorType = ".main_body .last_episodes .items li";

    res.animes = extract_searched_animes($, selectors);
    res.hasNextPage =
      $("li.selected").length > 0
        ? $("li.selected").length > 0
          ? $("li.selected").next().length > 0
          : false
        : false;

    res.totalPages =
      Number(
        $('li a[href*="page"]:last')?.attr("href")?.split("=").pop() ??
          $('li a[href*="page"]:last')?.attr("href")?.split("=").pop() ??
          $("li.selected a")?.text()?.trim()
      ) || 1;

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeSearchPage :", err); // for TESTING//
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
