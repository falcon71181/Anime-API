import axios, { AxiosError } from "axios";
import { URL_fn } from "../../utils/gogoanime/constants";
import { headers } from "../../config/headers";
import { CheerioAPI, load, SelectorType } from "cheerio";
import {
  extract_recent_released_home,
  extract_recently_added_series_home,
} from "../../extracters/gogoanime/extracters";
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

  let res: ScrapedHomePage = {
    genres: [],
    recentReleases: [],
    recentlyAddedSeries: [],
    onGoingSeries: [],
  };

  const $: CheerioAPI = load(mainPage.data);

  const recent_releases_selectors: SelectorType =
    "#load_recent_release > div.last_episodes.loaddub > ul > li";
  const recently_added_series_selectors: SelectorType =
    "#wrapper_bg > section > section.content_left > div.main_body.none > div.added_series_body.final > ul > li";
  const ongoing_series_selectors: SelectorType =
    "#scrollbar2 > div.viewport > div > nav > ul > li";

  try {
    let recentReleases = extract_recent_released_home(
      $,
      recent_releases_selectors,
    );
    let recentlyAddedSeries = extract_recently_added_series_home(
      $,
      recently_added_series_selectors,
    );
    let onGoingSeries = extract_recently_added_series_home(
      $,
      ongoing_series_selectors,
    );

    res.recentReleases = recentReleases;
    res.recentlyAddedSeries = recentlyAddedSeries;
    res.onGoingSeries = onGoingSeries;

    $("nav.menu_series.genre.right > ul > li").each((_index, element) => {
      const genre = $(element).find("a");
      const href = genre.attr("href");
      if (href) {
        res.genres.push(href.replace("/genre/", ""));
      }
    });

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
