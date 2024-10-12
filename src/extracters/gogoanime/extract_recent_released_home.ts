import { AxiosError } from "axios";
import { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import type { RecentRelease } from "../../types/gogoanime/anime";

export const extract_recent_released_home = (
  $: CheerioAPI,
  selectors: SelectorType,
): RecentRelease[] => {
  try {
    let recentReleases: RecentRelease[] = [];

    $(selectors).each((_index, _element) => {
      const animeNAME =
        $(_element).find(".name a")?.text()?.trim() ?? "UNKNOWN ANIME";

      const animeIMG =
        $(_element).find(".img img")?.attr("src")?.trim() ?? null;

      const id = animeIMG?.split("/").pop()?.split(".")[0] ?? "";

      const episodeNo =
        Number(
          $(_element).find("p.episode")?.text()?.trim().split(" ").pop(),
        ) ?? 0;

      const episodeUrl =
        $(_element).find("p.name a")?.attr("href")?.trim() ?? "";

      const episodeId = episodeUrl?.split("/")?.pop() ?? "";

      const subOrDub = $(_element).find(".type")?.hasClass("ic-SUB")
        ? "SUB"
        : "DUB";

      let anime: RecentRelease = {
        id: id,
        name: animeNAME,
        img: animeIMG,
        episodeId: episodeId,
        episodeNo: episodeNo,
        subOrDub: subOrDub,
        episodeUrl: episodeUrl,
      };
      recentReleases.push(anime);
    });

    return recentReleases;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_recent_released_home :", err); // for TESTING//
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
