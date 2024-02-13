import {
  URLs,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/aniwatch/constants";
import axios, { AxiosError } from "axios";
import { load } from "cheerio";
import createHttpError, { HttpError } from "http-errors";
import { extract_about_info } from "../../extracters/aniwatch/extracters";
import { ScrapedAboutPage } from "../../types/aniwatch/anime";

export const scrapeAboutPage = async (
  id: string,
): Promise<ScrapedAboutPage | HttpError> => {
  const res: ScrapedAboutPage = {
    info: [],
    // moreinfo: [],
    // genre: [],
    // seasons: [],
    // relatedAnimes: [],
    // mostPopularAnimes: [],
  };
  const aboutURL: string = new URL(id, URLs.BASE).toString();
  const mainPage = await axios.get(aboutURL, {
    headers: {
      "User-Agent": USER_AGENT_HEADER,
      "Accept-Encoding": ACCEPT_ENCODING_HEADER,
      Accept: ACCEPT_HEADER,
    },
  });

  const $ = load(mainPage.data);
  const selectors = "#ani_detail .container .anis-content";
  const extraInfoSelector = `${selectors} .anisc-info .item-title`;
  const animeGenreSelector = `${selectors} .anisc-info .item-list a`;
  const seasonsSelectors = ".os-list a.os-item";
  const relatedAnimesSelectors =
    "#main-sidebar .block_area.block_area_sidebar.block_area-realtime:nth-of-type(1) .anif-block-ul ul li";

  try {
    res.info = extract_about_info($, selectors);
    // res.moreinfo = extractExtraAboutInfo($, extraInfoSelector);
    // res.genre = extractAboutGenre($, animeGenreSelector);
    // res.seasons = extractSeasonsInfo($, seasonsSelectors);
    // res.relatedAnimes = extractRelatedAnimes($, relatedAnimesSelectors);

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeAboutPage :", err); // for TESTING//
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
