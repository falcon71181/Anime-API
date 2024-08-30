import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { MinimalAnime } from "../../types/aniwatch/anime";

export const extract_featured_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
): MinimalAnime[] => {
  try {
    const animes: MinimalAnime[] = [];

    $(selectors).each((_index, element) => {
      const animeID =
        $(element)
          .find(".film-detail .film-name .dynamic-name")
          ?.attr("href")
          ?.slice(1)
          ?.trim() || null;
      const animeNAME =
        $(element)
          .find(".film-detail .film-name .dynamic-name")
          ?.text()
          ?.trim() ?? "UNKNOWN ANIME";
      const animeIMG =
        $(element)
          .find(".film-poster a .film-poster-img")
          ?.attr("data-src")
          ?.trim() || null;

      animes.push({
        id: animeID,
        name: animeNAME,
        img: animeIMG,
      });
    });
    return animes.slice(0, 5);
  } catch (err) {
    /////////////////////////////////////////////////////////////////////////
    console.error("Error in extract_featured_animes :", err); // for TESTING//
    /////////////////////////////////////////////////////////////////////////

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
