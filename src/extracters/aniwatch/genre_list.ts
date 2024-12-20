import type { CheerioAPI, SelectorType } from "cheerio";
import createHttpError from "http-errors";
import { AxiosError } from "axios";

export const extract_genre_list = (
  $: CheerioAPI,
  selectors: SelectorType,
): string[] => {
  try {
    const genres: string[] = [];

    $(selectors).each((_index, element) => {
      genres.push(`${$(element)?.text()?.trim() || null}`);
    });
    return genres;
  } catch (err) {
    ///////////////////////////////////////////////////////////////////
    console.error("Error in extract_genre_list :", err); // for TESTING//
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
