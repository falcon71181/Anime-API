import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { SearchedAnime } from "../../types/gogoanime/anime";

export const extract_searched_animes = (
  $: CheerioAPI,
  selectors: SelectorType
): SearchedAnime[] => {
  try {
    const animes: SearchedAnime[] = [];

    $(selectors).each((_index, element) => {
      const animeID =
        $(element)
          .find(".name a")
          ?.attr("href")
          ?.replace(/\/category\//g, "")
          ?.trim() ?? "UNKNOWN ANIME";
      const animeNAME = $(element).find(".name a")?.text()?.trim() ?? "null";
      const animePoster =
        $(element).find(".img img")?.attr("src")?.trim() ?? null;
      const releasedIn =
        $(element)
          .find(".released")
          ?.text()
          ?.replace(/Released:\s*/g, "")
          ?.trim() || null;

      animes.push({
        id: animeID,
        name: animeNAME,
        img: animePoster,
        releasedYear: releasedIn,
      });
    });

    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_searched_animes :", err); // for TESTING//
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
