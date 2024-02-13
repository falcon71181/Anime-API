import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { AboutAnimeInfo } from "../../types/aniwatch/anime";

export const extract_about_info = (
  $: CheerioAPI,
  selectors: SelectorType,
): AboutAnimeInfo[] => {
  try {
    const info: AboutAnimeInfo[] = [];

    $(selectors).each((_index, _element) => {
      const animeID =
        $(selectors)
          ?.find(".anisc-detail .film-buttons a.btn-play")
          ?.attr("href")
          ?.split("/")
          ?.pop() || null;
      const animeNAME =
        $(selectors)
          ?.find(".anisc-detail .film-name.dynamic-name")
          ?.text()
          ?.trim() ?? "UNKNOWN ANIME";
      const animeIMG =
        $(selectors)
          ?.find(".film-poster .film-poster-img")
          ?.attr("src")
          ?.trim() || null;
      const animeRATING =
        $(`${selectors} .film-stats .tick .tick-pg`)?.text()?.trim() || null;
      const animeQUALITY =
        $(`${selectors} .film-stats .tick .tick-quality`)?.text()?.trim() ||
        null;
      const epSUB =
        Number($(`${selectors} .film-stats .tick .tick-sub`)?.text()?.trim()) ||
        null;
      const epDUB =
        Number($(`${selectors} .film-stats .tick .tick-dub`)?.text()?.trim()) ||
        null;
      const total_eps =
        Number($(`${selectors} .film-stats .tick .tick-eps`)?.text()?.trim()) ||
        null;
      const animeCategory =
        $(`${selectors} .film-stats .tick`)
          ?.text()
          ?.trim()
          ?.replace(/[\s\n]+/g, " ")
          ?.split(" ")
          ?.at(-2) || null;
      const duration =
        $(`${selectors} .film-stats .tick`)
          ?.text()
          ?.trim()
          ?.replace(/[\s\n]+/g, " ")
          ?.split(" ")
          ?.pop() || null;
      const animeDESCRIPTION =
        $(selectors)
          ?.find(".anisc-detail .film-description .text")
          ?.text()
          ?.split("[")
          ?.shift()
          ?.trim() ?? "UNKNOW ANIME DESCRIPTION";

      info.push({
        id: animeID,
        name: animeNAME,
        img: animeIMG,
        rating: animeRATING,
        episodes: {
          eps: total_eps,
          sub: epSUB,
          dub: epDUB,
        },
        category: animeCategory,
        quality: animeQUALITY,
        duration: duration,
        description: animeDESCRIPTION,
      });
    });
    return info;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_about_info :", err); // for TESTING//
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
