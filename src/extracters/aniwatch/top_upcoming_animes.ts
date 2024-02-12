import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { TopUpcomingAnime } from "../../types/aniwatch/anime";

export const extract_top_upcoming_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
): TopUpcomingAnime[] => {
  try {
    const animes: TopUpcomingAnime[] = [];
    $(selectors).each((_index, element) => {
      const animeID =
        $(element)
          .find(".film-detail .film-name .dynamic-name")
          ?.attr("href")
          ?.slice(1) || null;
      const animeNAME =
        $(element)
          .find(".film-detail .film-name .dynamic-name")
          ?.text()
          ?.trim() ?? "UNKNOWN ANIME";
      const noOfSubEps =
        Number($(element).find(".film-poster .tick .tick-sub")?.text()) || null;
      const noOfDubEps =
        Number($(element).find(".film-poster .tick .tick-dub")?.text()) || null;
      const totalNoOfEps =
        Number($(element).find(".film-poster .tick .tick-eps")?.text()) || null;
      const epLengthTime =
        $(element)
          .find(".film-detail .fd-infor .fdi-duration")
          ?.text()
          ?.trim() ?? "UNKNOWN";
      const adultRated =
        $(element).find(".film-poster .tick-rate")?.text()?.trim() || null;
      const animeIMG =
        $(element).find(".film-poster .film-poster-img").attr("data-src") ||
        null;

      animes.push({
        id: animeID,
        name: animeNAME,
        img: animeIMG,
        episodes: {
          eps: totalNoOfEps,
          sub: noOfSubEps,
          dub: noOfDubEps,
        },
        duration: epLengthTime,
        rated: adultRated === "18+",
      });
    });
    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_top_upcoming_animes :", err); // for TESTING//
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
