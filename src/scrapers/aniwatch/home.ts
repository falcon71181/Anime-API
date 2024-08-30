import {
  URL_fn,
} from "../../utils/aniwatch/constants";
import { headers } from "../../config/headers";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import {
  extract_top10_animes,
  extract_spotlight_animes,
  extract_trending_animes,
  extract_latest_episodes,
  extract_featured_animes,
  extract_top_upcoming_animes,
  extract_genre_list,
} from "../../extracters/aniwatch/extracters";
import {
  Top10AnimeTimePeriod,
  ScrapedHomePage,
} from "../../types/aniwatch/anime";

export const scrapeHomePage = async (): Promise<
  ScrapedHomePage | HttpError
> => {
  const res: ScrapedHomePage = {
    spotLightAnimes: [],
    trendingAnimes: [],
    latestEpisodes: [],
    top10Animes: {
      day: [],
      week: [],
      month: [],
    },
    featuredAnimes: {
      topAiringAnimes: [],
      mostPopularAnimes: [],
      mostFavoriteAnimes: [],
      latestCompletedAnimes: [],
    },
    topUpcomingAnimes: [],
    genres: [],
  };
  const URLs = await URL_fn();
  try {
    const mainPage = await axios.get(URLs.HOME, {
      headers: {
        "User-Agent": headers.USER_AGENT_HEADER,
        "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
        Accept: headers.ACCEPT_HEADER,
      },
    });
    const $: CheerioAPI = load(mainPage.data);
    const trendingAnimeSelectors: SelectorType =
      "#anime-trending #trending-home .swiper-wrapper .swiper-slide";
    const top10Selectors: SelectorType =
      '#main-sidebar .block_area-realtime [id^="top-viewed-"]';
    const latestEpisodesSelectors: SelectorType =
      "#main-content .block_area_home:nth-of-type(1) .tab-content .film_list-wrap .flw-item";
    const topAiringSelectors: SelectorType =
      "#anime-featured .row div:nth-of-type(1) .anif-block-ul ul li";
    const mostPopularSelectors: SelectorType =
      "#anime-featured .row div:nth-of-type(2) .anif-block-ul ul li";
    const mostFavoriteSelectors: SelectorType =
      "#anime-featured .row div:nth-of-type(3) .anif-block-ul ul li";
    const latestCompletedSelectors: SelectorType =
      "#anime-featured .row div:nth-of-type(4) .anif-block-ul ul li";
    const topUpcomingSelectors: SelectorType =
      "#main-content .block_area_home:nth-of-type(3) .tab-content .film_list-wrap .flw-item";
    const spotLightSelectors: SelectorType =
      "#slider .swiper-wrapper .swiper-slide";
    const genresSelectors: SelectorType =
      "#main-sidebar .block_area.block_area_sidebar.block_area-genres .sb-genre-list li";

    res.trendingAnimes = extract_trending_animes($, trendingAnimeSelectors);
    res.latestEpisodes = extract_latest_episodes($, latestEpisodesSelectors);

    res.featuredAnimes.topAiringAnimes = extract_featured_animes($, topAiringSelectors);
    res.featuredAnimes.mostPopularAnimes = extract_featured_animes($, mostPopularSelectors);
    res.featuredAnimes.mostFavoriteAnimes = extract_featured_animes($, mostFavoriteSelectors);
    res.featuredAnimes.latestCompletedAnimes = extract_featured_animes($, latestCompletedSelectors);

    res.topUpcomingAnimes = extract_top_upcoming_animes(
      $,
      topUpcomingSelectors,
    );
    res.spotLightAnimes = extract_spotlight_animes($, spotLightSelectors);
    res.genres = extract_genre_list($, genresSelectors);

    $(top10Selectors).each((_index, element) => {
      const periodType = $(element)
        .attr("id")
        ?.split("-")
        ?.pop()
        ?.trim() as Top10AnimeTimePeriod;
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
    console.error("Error in scrapeHomePage:", err); // for TESTING//
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
