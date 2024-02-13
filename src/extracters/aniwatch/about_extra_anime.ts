import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { ExtraAboutAnimeInfo } from "../../types/aniwatch/anime";

export const extract_extra_about_info = (
  $: CheerioAPI,
  selectors: SelectorType,
): ExtraAboutAnimeInfo => {
  try {
    const moreInfo: ExtraAboutAnimeInfo = {};
    const genres: string[] = [];
    const producers: string[] = [];

    $(selectors + " .item-title").each((_index, element) => {
      const animeKEY: string =
        $(element).find(".item-head")?.text()?.trim() ?? "UNKNOWN";
      const animeVALUE = $(element).find(".name")?.text()?.trim() ?? "UNKNOWN";

      if (animeKEY !== "Producers:" && animeKEY !== "Overview:") {
        moreInfo[animeKEY] = animeVALUE;
      } else if (animeKEY === "Producers:") {
        $(selectors + " .item-title a").each((_index, element) => {
          const animeProducers = $(element)?.text()?.trim() ?? "UNKNOWN";
          producers.push(animeProducers);
        });
      }
    });

    $(selectors + " .item-list a").each((_index, element) => {
      const animeGENRES = $(element)?.text()?.trim() ?? "UNKNOWN";
      genres.push(animeGENRES);
    });

    moreInfo["Genres"] = genres;
    moreInfo["Producers"] = producers;

    return moreInfo;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_extra_about_info :", err); // for TESTING//
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
