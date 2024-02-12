import {
  URLs,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/aniwatch/constants";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import {
  extract_top10_animes,
  extract_spotlight_animes,
  extract_trending_animes,
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
    top10Animes: {
      day: [],
      week: [],
      month: [],
    },
    // topAiringAnimes: [],
    // topUpcomingAnimes: [],
    // genres: [],
  };
  try {
    const mainPage = await axios.get(URLs.HOME, {
      headers: {
        "User-Agent": USER_AGENT_HEADER,
        "Accept-Encoding": ACCEPT_ENCODING_HEADER,
        Accept: ACCEPT_HEADER,
      },
    });
    const $ = load(mainPage.data);
    const trendingAnimeSelectors =
      "#anime-trending #trending-home .swiper-wrapper .swiper-slide";
    const top10Selectors =
      '#main-sidebar .block_area-realtime [id^="top-viewed-"]';
    const topAiringSelectors =
      "#anime-featured .row div:nth-of-type(1) .anif-block-ul ul li";
    const topUpcomingSelectors =
      "#main-content .block_area_home:nth-of-type(3) .tab-content .film_list-wrap .flw-item";
    const spotLightSelectors = "#slider .swiper-wrapper .swiper-slide";
    const genresSelectors =
      "#main-sidebar .block_area.block_area_sidebar.block_area-genres .sb-genre-list li";

    res.trendingAnimes = extract_trending_animes($, trendingAnimeSelectors);
    // res.topAiringAnimes = extractTopAiringAnimes($, topAiringSelectors);
    // res.topUpcomingAnimes = extractAnimes($, topUpcomingSelectors);
    res.spotLightAnimes = extract_spotlight_animes($, spotLightSelectors);
    // res.genres = extractGenreList($, genresSelectors);

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
