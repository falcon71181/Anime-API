import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";
import { Episode } from "../../types/gogoanime/anime";

export const extract_episodes = (
  $: CheerioAPI,
  selectors: SelectorType,
  url_base: string
): Episode[] => {
  try {
    let episodes: Episode[] = [];
    $(selectors).each((_, ele) => {
      const a = $(ele).children('a');

      const title = a.children('.name').text().trim();

      const href = a.attr('href') ?? '';

      const id = href.split('/').pop() ?? '';
      const link = new URL(href, url_base).toString();

      episodes.push({ id, title,  link});
    });

    return episodes;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in extract_episodes :", err); // for TESTING//
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
