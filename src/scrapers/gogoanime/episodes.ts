import axios, { AxiosError } from "axios";
import { URL_fn } from "../../utils/gogoanime/constants";
import { headers } from "../../config/headers";
import { CheerioAPI, load, SelectorType } from "cheerio";
import {
    extract_episodes,
} from "../../extracters/gogoanime/extracters";
import createHttpError, { HttpError } from "http-errors";
import { ScrapedEpisodes } from "../../types/gogoanime/anime";

export const scrapeEpisodePage = async (id: String): Promise<
  ScrapedEpisodes | HttpError
> => {
  const URLs = await URL_fn();

  const mainPage = await axios.get(`${URLs.AJAX}/load-list-episode?ep_start=0&ep_end=9999&id=${id}&default_ep=0`, {
    headers: {
      "User-Agent": headers.USER_AGENT_HEADER,
      "Accept-Encoding": headers.ACCEPT_ENCODEING_HEADER,
      Accept: headers.ACCEPT_HEADER,
    },
  });

  let res: ScrapedEpisodes = {
    episodes: []
  };

  const $: CheerioAPI = load(mainPage.data);

  const episode_selectors: SelectorType = "ul#episode_related li";

  try {
    let episodes = extract_episodes($, episode_selectors, URLs.BASE);

    res.episodes = episodes;

    return res;
  } catch (err) {
    ////////////////////////////////////////////////////////////////
    console.error("Error in scrapeEpisodePage :", err); // for TESTING//
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
