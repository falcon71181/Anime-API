import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { TopAiring } from "../../types/gogoanime/anime";

export const extract_top_airing = (
  $: CheerioAPI,
  selectors: SelectorType,
  url_base: string,
): TopAiring[] => {
  try {
    const animes: TopAiring[] = [];
    $(selectors).each((_index, element: any) => {
      let genres: string[] = [];
      $(element)
        .find('p.genres > a')
        .each((_index, element) => {
          genres.push($(element)?.attr('title') ?? "");
        });
      const animeID =
        $(element).find('a:nth-child(1)')?.attr('href')?.split('/')[2] ?? "UNKNOWN";
      const animeNAME =
        $(element).find('a:nth-child(1)')?.attr('title') ?? "UNKNOWN";
      const animeIMG = $(element)
        .find('a:nth-child(1) > div')
        ?.attr('style')
        ?.match('(https?://.*.(?:png|jpg))')?.[0] || "UNKNOWN";
      const latestEpesiode = $(element).find('p:nth-child(4) > a').text().trim();
      const animeUrl = url_base + '/' + $(element).find('a:nth-child(1)').attr('href');

      animes.push({
        id: animeID,
        name: animeNAME,
        img: animeIMG,
        latestEp: latestEpesiode,
        animeUrl: animeUrl,
        genres: genres
      });
    });
    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_top_airing :", err); // for TESTING//
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


