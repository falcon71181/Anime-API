import { AxiosError } from "axios";
import { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import type {
  ScrapedHomePage,
  RecentRelease,
} from "../../types/gogoanime/anime";

export const extract_home_info = (
  $: CheerioAPI,
  selectors: SelectorType,
): ScrapedHomePage => {
  try {
    let recentReleases: RecentRelease[] = [];
    const genres: string[] = [];

    $("nav.menu_series.genre.right > ul > li").each((_index, element) => {
      const genre = $(element).find("a");
      const href = genre.attr("href");
      if (href) {
        genres.push(href.replace("/genre/", ""));
      }
    });

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

    let res: ScrapedHomePage = {
      genres: genres,
      recentReleases: recentReleases,
    };

    return res;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_home_info :", err); // for TESTING//
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
