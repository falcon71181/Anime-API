import {
  URLs,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/aniwatch/constants";
import axios, { AxiosError } from "axios";
import createHttpError, { HttpError } from "http-errors";
import { load } from "cheerio";
import type { CheerioAPI, SelectorType } from "cheerio";
import { ScrapedEpisodesPage } from "../../types/aniwatch/anime";
import { extract_episodes_info } from "../../extracters/aniwatch/extracters";

export const scrapeEpisodesPage = async (
  animeId: string,
): Promise<ScrapedEpisodesPage | HttpError> => {
  const res: ScrapedEpisodesPage = {
    totalEpisodes: 0,
    episodes: [],
  };

  try {
    const episodes = await axios.get(
      `${URLs.AJAX}/v2/episode/list/${animeId.split("-").pop()}`,
      {
        headers: {
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Accept: ACCEPT_HEADER,
          Referer: `${URLs.BASE}/watch/${animeId}`,
        },
      },
    );

    const $: CheerioAPI = load(episodes.data.html);
    const selectors: SelectorType = ".detail-infor-content .ss-list a";

    res.totalEpisodes = Number($(`${selectors}`).length);
    res.episodes = extract_episodes_info($, selectors);

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeEpisodesPage :", err); // for TESTING//
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
