import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { extract_related_animes } from "./extracters";
import { MostPopularAnime } from "../../types/aniwatch/anime";

export const extract_mostpopular_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
): MostPopularAnime[] => {
  try {
    const animes: MostPopularAnime[] = extract_related_animes($, selectors);

    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_mostpopular_animes :", err); // for TESTING//
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
