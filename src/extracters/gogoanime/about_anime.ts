import { AxiosError } from "axios";
import { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AboutAnimeInfo } from "../../types/gogoanime/anime";

export const extract_about_info = (
  $: CheerioAPI,
  selectors: SelectorType
): AboutAnimeInfo => {
  try {
    let info: AboutAnimeInfo | undefined;

    $(selectors).each((_index, _element) => {
      const animeNAME =
        $(selectors)
          .find(".anime_info_episodes h2")
          ?.text()
          ?.split("/")
          ?.pop() ?? "UNKNOWN ANIME";

      const animeIMG =
        $(selectors).find(".anime_info_body_bg img")?.attr("src")?.trim() ??
        null;

      const animeTYPE =
        $(selectors)
          .find("p.type:contains('Type:') a")
          ?.text()
          .replace("Type:", "")
          .trim() || null;

      const animeGENRES: string[] = [];
      $(selectors)
        .find("p.type:contains('Genre:') a")
        .each((_, element) => {
          animeGENRES.push($(element).text().trim());
        });

      const animeSTATUS =
        $(selectors)
          .find("p.type:contains('Status:') a")
          ?.text()
          .replace("Status:", "")
          .trim() || null;

      const animeAIRED =
        parseInt(
          $(selectors)
            .find("p.type:contains('Released:')")
            ?.text()
            .replace("Released: ", "")
            .trim()
        ) || null;

      const animeOTHERNAME =
        $(selectors)
          .find("p.type:contains('Other name:') a")
          ?.text()
          .replace("Other name:", "")
          .trim() || null;

      const totalEPISODES =
        parseInt(
          $(selectors)
            .find("#episode_page li:last-child a")
            .text()
            .split("-")[1]
        ) || 0;

      info = {
        name: animeNAME,
        img: animeIMG,
        type: animeTYPE,
        genre: animeGENRES,
        status: animeSTATUS,
        aired_in: animeAIRED,
        other_name: animeOTHERNAME,
        episodes: totalEPISODES,
      };
    });

    if (info === undefined) {
      info = {
        name: null,
        img: null,
        type: null,
        genre: null,
        status: null,
        aired_in: null,
        other_name: null,
        episodes: null,
      };
    }

    return info;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_about_info :", err); // for TESTING//
    ///////////////////////////////////////////////////////////////////

    if (err instanceof AxiosError) {
      throw createHttpError(
        err?.response?.status || 500,
        err?.response?.statusText || "Something went wrong"
      );
    } else {
      throw createHttpError.InternalServerError("Internal server error");
    }
  }
};
