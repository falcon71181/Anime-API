import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { MinimalAnime } from "../../types/aniwatch/anime";

export const extract_trending_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
): MinimalAnime[] => {
  try {
    const animes: MinimalAnime[] = [];

    $(selectors).each((_index, element) => {
      const animeID =
        $(element).find(".item .film-poster")?.attr("href")?.slice(1) || null;
      const animeNAME =
        $(element)
          .find(".item .number .film-title.dynamic-name")
          ?.text()
          ?.trim() ?? "UNKNOWN ANIME";
      const animeIMG = $(element)
        .find(".item .film-poster .film-poster-img")
        ?.attr("data-src")
        ?.trim() || null;

      animes.push({
        id: animeID,
        name: animeNAME,
        img: animeIMG,
      });
    });
    return animes;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////////
    console.error("Error in extract_trending_animes :", err); // for TESTING//
    ///////////////////////////////////////////////////////////////////////

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
