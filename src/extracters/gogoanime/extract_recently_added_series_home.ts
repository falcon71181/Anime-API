import { AxiosError } from "axios";
import { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { Anime } from "../../types/gogoanime/anime";

export const extract_recently_added_series_home = (
  $: CheerioAPI,
  selectors: SelectorType,
): Anime[] => {
  try {
    let recentlyAddedSeries: Anime[] = [];

    $(selectors).each((_index, element) => {
      const animeNAME =
        $(element).find("a[title]")?.last().text()?.trim() ?? "UNKNOWN ANIME";

      const id =
        $(element).find("a")?.attr("href")?.trim().split("/").pop() ?? "";

      const animeIMG = `https://gogocdn.net/cover/${id}.png`;

      let anime: Anime = {
        id: id,
        name: animeNAME,
        img: animeIMG,
      };

      recentlyAddedSeries.push(anime);
    });

    return recentlyAddedSeries;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_recently_added_series_home :", err); // for TESTING//
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
