import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { RelatedAnime } from "../../types/aniwatch/anime";

export const extract_related_animes = (
  $: CheerioAPI,
  selectors: SelectorType,
): RelatedAnime[] => {
  try {
    const animes: RelatedAnime[] = [];

    $(selectors).each((_index, element) => {
      const animeID =
        $(element)
          .find(".film-detail .dynamic-name")
          ?.attr("href")
          ?.slice(1)
          .trim() || null;
      const animeNAME =
        $(element).find(".film-detail .dynamic-name")?.text()?.trim() ??
        "UNKNOWN ANIME";
      const animeIMG =
        $(element)
          .find(".film-poster .film-poster-img")
          ?.attr("data-src")
          ?.trim() || null;
      const epSUB =
        Number(
          $(selectors)
            .find(".fd-infor .tick .tick-item.tick-sub")
            ?.text()
            ?.trim(),
        ) || null;
      const epDUB =
        Number(
          $(selectors)
            .find(".fd-infor .tick .tick-item.tick-dub")
            ?.text()
            ?.trim(),
        ) || null;
      const total_eps =
        Number(
          $(selectors)
            .find(".fd-infor .tick .tick-item.tick-eps")
            ?.text()
            ?.trim(),
        ) || null;
      const animeTYPE =
        $(selectors)
          ?.find(".fd-infor .tick")
          ?.text()
          ?.trim()
          ?.replace(/[\s\n]+/g, " ")
          ?.split(" ")
          ?.pop() || null;

      animes.push({
        id: animeID,
        name: animeNAME,
        category: animeTYPE,
        img: animeIMG,
        episodes: {
          eps: total_eps,
          sub: epSUB,
          dub: epDUB,
        },
      });
    });
    return animes;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////////////
    console.error("Error in extract_related_animes :", err); // for TESTING//
    ///////////////////////////////////////////////////////////////////////////

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
