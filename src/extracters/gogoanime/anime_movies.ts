import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { extract_new_seasons } from "./extracters";
import { AnimeMovie } from "../../types/gogoanime/anime";

export const extract_anime_movies = (
  $: CheerioAPI,
  selectors: SelectorType,
  url_base: string
): AnimeMovie[] => {
  try {
    const animes: AnimeMovie[] = extract_new_seasons($, selectors, url_base);
    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_anime_movies :", err); // for TESTING//
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

