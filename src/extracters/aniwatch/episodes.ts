import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { Episode } from "../../types/aniwatch/anime";

export const extract_episodes_info = (
  $: CheerioAPI,
  selectors: SelectorType,
) => {
  try {
    const episodes: Episode[] = [];

    $(`${selectors}`).each((_index, element) => {
      episodes.push({
        name: $(element)?.attr("title")?.trim() || null,
        episodeNo: Number($(element).attr("data-number")),
        episodeId: $(element)?.attr("href")?.split("/")?.pop() || null,
        filler: $(element).hasClass("ssl-item-filler"),
      });
    });

    return episodes;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_episodes_info :", err); // for TESTING//
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
