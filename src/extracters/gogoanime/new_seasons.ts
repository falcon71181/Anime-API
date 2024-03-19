import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { NewSeason } from "../../types/gogoanime/anime";

export const extract_new_seasons = (
  $: CheerioAPI,
  selectors: SelectorType,
  url_base: string,
): NewSeason[] => {
  try {
    const animes: NewSeason[] = [];
    $(selectors).each((_index, element: any) => {
      const animeID =
        $(element).find('p.name > a')?.attr('href')?.split('/')[2] ?? "UNKNOWN";
      const animeNAME =
        $(element).find("p.name > a")?.attr("title") ?? "UNKNOWN";
      const animeIMG = $(element).find('div > a > img').attr('src') ?? "UNKNOWN";
      const releasedDate = $(element).find('p.released').text().replace('Released: ', '').trim();
      const animeUrl = url_base + '/' + $(element).find('p.name > a').attr('href');

      animes.push({
        id: animeID,
        name: animeNAME,
        img: animeIMG,
        releasedYear: releasedDate,
        animeUrl: animeUrl,
      });
    });
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

