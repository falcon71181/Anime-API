import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { extract_top_upcoming_animes } from "./extracters";
import { RecommendedAnime } from "../../types/aniwatch/anime";

export const extract_recommended_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
): RecommendedAnime[] => {
  try {
    const animes: RecommendedAnime[] = extract_top_upcoming_animes(
      $,
      selectors,
    );

    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_recommended_animes :", err); // for TESTING//
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
