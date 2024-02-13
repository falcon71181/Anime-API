import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { AnimeSeasonsInfo } from "../../types/aniwatch/anime";

export const extract_anime_seasons_info = (
  $: CheerioAPI,
  selectors: SelectorType,
): AnimeSeasonsInfo[] => {
  try {
    const seasons: AnimeSeasonsInfo[] = [];

    $(selectors).each((_index, element) => {
      const animeID = $(element)?.attr("href")?.slice(1)?.trim() || null;
      const animeNAME = $(element)?.attr("title")?.trim() ?? "UNKNOWN ANIME";
      const animeTITLE = $(element)?.find(".title")?.text()?.trim() || null;
      const animeIMG =
        $(element)
          ?.find(".season-poster")
          ?.attr("style")
          ?.split(" ")
          ?.pop()
          ?.split("(")
          ?.pop()
          ?.split(")")[0] || null;

      seasons.push({
        id: animeID,
        name: animeNAME,
        seasonTitle: animeTITLE,
        img: animeIMG,
        isCurrent: $(element)?.hasClass("active"),
      });
    });
    return seasons;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_anime_seasons_info :", err); // for TESTING//
    ///////////////////////////////////////////////////////////////////

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
