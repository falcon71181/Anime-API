import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { extract_new_seasons } from "./extracters";
import { PopularAnime } from "../../types/gogoanime/anime";

export const extract_popular_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
  url_base: string
): PopularAnime[] => {
  try {
    const animes: PopularAnime[] = extract_new_seasons($, selectors, url_base);
    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_new_seasons :", err); // for TESTING//
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
