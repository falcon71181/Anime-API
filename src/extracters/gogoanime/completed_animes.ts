import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { extract_new_seasons } from "./extracters";
import { CompletedAnime } from "../../types/gogoanime/anime";

export const extract_completed_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
  url_base: string,
): CompletedAnime[] => {
  try {
    const animes: CompletedAnime[] = extract_new_seasons(
      $,
      selectors,
      url_base,
    );
    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_completed_animes :", err); // for TESTING//
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
