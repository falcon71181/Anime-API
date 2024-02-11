import createHttpError from "http-errors";
import type { CheerioAPI, SelectorType } from "cheerio";
import { AxiosError } from "axios";
import { SpotLightAnime } from "../../types/aniwatch/anime";

export const extract_spotlight_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
): SpotLightAnime[] => {
  try {
    const animes: SpotLightAnime[] = [];

    $(selectors).each((_index, element) => {
      const animeID =
        $(element)
          .find(".deslide-item-content .desi-buttons a")
          ?.last()
          ?.attr("href")
          ?.slice(1)
          ?.trim() || null;
      const animeNAME =
        $(element)
          .find(".deslide-item-content .desi-head-title.dynamic-name")
          ?.text()
          ?.trim() ?? "UNKNOWN ANIME";
      const animeRANK =
        Number(
          $(element)
            .find(".deslide-item-content .desi-sub-text")
            ?.text()
            ?.trim()
            ?.split(" ")[0]
            ?.slice(1),
        ) || null;
      const animeIMG =
        $(element)
          .find(".deslide-cover .deslide-cover-img .film-poster-img")
          ?.attr("data-src")
          ?.trim() || null;
      const animeDESCRIPTION =
        $(element)
          .find(".deslide-item-content .desi-description")
          ?.text()
          ?.split("[")
          ?.shift()
          ?.trim() ?? "UNKNOW ANIME DESCRIPTION";
      const animeEXTRA = $(element)
        .find(".deslide-item-content .sc-detail .scd-item")
        .map((_i, el) => $(el).text().trim())
        .get();

      const episodeDetails = animeEXTRA[4].split(/\s+/).map(Number) || null;

      animes.push({
        id: animeID,
        name: animeNAME,
        rank: animeRANK,
        img: animeIMG,
        episodes: {
          eps: episodeDetails[2],
          sub: episodeDetails[0],
          dub: episodeDetails[1],
        },
        duration: animeEXTRA[1],
        quality: animeEXTRA[3],
        category: animeEXTRA[0],
        releasedDay: animeEXTRA[2],
        description: animeDESCRIPTION,
      });
    });

    return animes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////////////
    console.error("Error in extract_spotlight_animes :", err); // for TESTING//
    ////////////////////////////////////////////////////////////////////////

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
