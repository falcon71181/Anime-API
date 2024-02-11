import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { Top10Anime } from "../../types/aniwatch/anime";

export const extract_top10_animes = (
  $: CheerioAPI,
  periodType: SelectorType,
): Top10Anime[] => {
  try {
    const animes: Top10Anime[] = [];
    const selectors = `#top-viewed-${periodType} ul li`;

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

      const animeRANK =
        Number($(element).find(".film-number span")?.text()?.trim()) || null;

      const noOfSubEps =
        Number(
          $(element).find(".film-detail .fd-infor .tick-item.tick-sub")?.text(),
        ) || null;

      const noOfDubEps =
        Number(
          $(element).find(".film-detail .fd-infor .tick-item.tick-dub")?.text(),
        ) || null;

      const totalNoOfEps =
        Number(
          $(element).find(".film-detail .fd-infor .tick-item.tick-eps")?.text(),
        ) || null;

      const animeIMG =
        $(element)
          .find(".film-poster .film-poster-img")
          ?.attr("data-src")
          ?.trim() || null;

      animes.push({
        id: animeID,
        name: animeNAME,
        rank: animeRANK,
        img: animeIMG,
        episodes: {
          eps: totalNoOfEps,
          sub: noOfSubEps,
          dub: noOfDubEps,
        },
      });
    });
    return animes;
  } catch (err) {
    /////////////////////////////////////////////////////////////////////
    console.error("Error in extract_top10_animes :", err); // for TESTING//
    /////////////////////////////////////////////////////////////////////

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
