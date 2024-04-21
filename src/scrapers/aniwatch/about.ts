import {
  URL_fn,
} from "../../utils/aniwatch/constants";
import { headers } from "../../config/headers";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import {
  extract_about_info,
  extract_extra_about_info,
  extract_anime_seasons_info,
  extract_related_animes,
  extract_recommended_animes,
  extract_mostpopular_animes,
} from "../../extracters/aniwatch/extracters";
import { ScrapedAboutPage, AboutAnimeInfo } from "../../types/aniwatch/anime";

export const scrapeAboutPage = async (
  id: string,
): Promise<ScrapedAboutPage | HttpError> => {
  const defaultInfo: AboutAnimeInfo = {
    id: null,
    name: "UNKNOWN ANIME",
    img: null,
    rating: null,
    episodes: {
      eps: null,
      sub: null,
      dub: null,
    },
    category: null,
    quality: null,
    duration: null,
    description: "UNKNOW ANIME DESCRIPTION",
  };

  const res: ScrapedAboutPage = {
    info: defaultInfo, // TODO: need to improve it in future
    moreInfo: {},
    seasons: [],
    relatedAnimes: [],
    recommendedAnimes: [],
    mostPopularAnimes: [],
  };
  const URLs = await URL_fn();
  const aboutURL: string = new URL(id, URLs.BASE).toString();
  const mainPage = await axios.get(aboutURL, {
    headers: {
      "User-Agent": headers.USER_AGENT_HEADER,
      "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
      Accept: headers.ACCEPT_HEADER,
    },
  });

  const $: CheerioAPI = load(mainPage.data);
  const selectors: SelectorType = "#ani_detail .container .anis-content";
  const extraInfoSelector: SelectorType = `${selectors} .anisc-info`;
  const seasonsSelectors: SelectorType = ".os-list a.os-item";
  const relatedAnimesSelectors: SelectorType =
    "#main-sidebar .block_area.block_area_sidebar.block_area-realtime:nth-of-type(1) .anif-block-ul ul li";
  const recommendedAnimesSelectors: SelectorType =
    "#main-content .block_area.block_area_category .tab-content .flw-item";
  const mostPopularAnimesSelectors: SelectorType =
    "#main-sidebar .block_area.block_area_sidebar.block_area-realtime:nth-of-type(2) .anif-block-ul ul li";

  try {
    res.info = extract_about_info($, selectors);
    res.moreInfo = extract_extra_about_info($, extraInfoSelector);
    res.seasons = extract_anime_seasons_info($, seasonsSelectors);
    res.relatedAnimes = extract_related_animes($, relatedAnimesSelectors);
    res.recommendedAnimes = extract_recommended_animes(
      $,
      recommendedAnimesSelectors,
    );
    res.mostPopularAnimes = extract_mostpopular_animes(
      $,
      mostPopularAnimesSelectors,
    );

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeAboutPage :", err); // for TESTING//
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
