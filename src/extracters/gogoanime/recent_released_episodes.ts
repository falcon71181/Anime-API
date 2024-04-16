import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { RecentRelease } from "../../types/gogoanime/anime";

export const extract_latest_episodes = (
  $: CheerioAPI,
  selectors: SelectorType,
  url_base: string,
): RecentRelease[] => {
  try {
    const animes: RecentRelease[] = [];
    $(selectors).each((_index, element: any) => {
      const animeID =
        $(element)
          .find("p.name > a")
          ?.attr("href")
          ?.split("/")[1]
          ?.split("-episode-")[0] ?? "UNKNOWN";
      const episodeId =
        $(element).find("p.name > a")?.attr("href")?.split("/")[1] ?? "UNKNOWN";
      const animeNAME =
        $(element).find("p.name > a")?.attr("title") ?? "UNKNOWN";
      const episodeNo = Number(
        $(element).find("p.episode").text().replace("Episode ", "").trim(),
      );
      const subOrDub =
        $(element)
          .find("div > a > div")
          ?.attr("class")
          ?.replace("type ic-", "") || "UNKNOWN";
      const animeIMG = $(element).find("div > a > img")?.attr("src") ?? "SUB";
      const episodeUrl =
        url_base + "/" + $(element).find("p.name > a").attr("href");

      animes.push({
        id: animeID,
        name: animeNAME,
        img: animeIMG,
        episodeId: episodeId,
        episodeNo: episodeNo,
        episodeUrl: episodeUrl,
        subOrDub: subOrDub,
      });
    });
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
