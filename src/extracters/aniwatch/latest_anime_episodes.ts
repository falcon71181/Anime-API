import type { CheerioAPI, SelectorType } from "cheerio";
import { extract_top_upcoming_animes } from "./extracters";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { LatestAnimeEpisode } from "../../types/aniwatch/anime";

export const extract_latest_episodes = (
  $: CheerioAPI,
  selectors: SelectorType,
): LatestAnimeEpisode[] => {
  try {
    const animes: LatestAnimeEpisode[] = extract_top_upcoming_animes(
      $,
      selectors,
    );

    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_latest_episodes :", err); // for TESTING//
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
