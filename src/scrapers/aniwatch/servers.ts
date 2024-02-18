import {
  URLs,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/aniwatch/constants";
import axios, { AxiosError } from "axios";
import createHttpError, { type HttpError } from "http-errors";
import { load, type CheerioAPI, type SelectorType } from "cheerio";
import type { ScrapedEpisodeServer } from "../../types/aniwatch/anime";

export const scrapeEpisodeServersPage = async (
  episodeId: string,
): Promise<ScrapedEpisodeServer | HttpError> => {
  const res: ScrapedEpisodeServer = {
    episodeId,
    episodeNo: 0,
    sub: [],
    dub: [],
  };

  try {
    const epId = episodeId.split("?ep=")[1];

    const { data } = await axios.get(
      `${URLs.AJAX}/v2/episode/servers?episodeId=${epId}`,
      {
        headers: {
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
          "Accept-Encoding": ACCEPT_ENCODING_HEADER,
          Accept: ACCEPT_HEADER,
          Referer: new URL(`/watch/${episodeId}`, URLs.BASE).href,
        },
      },
    );

    const $: CheerioAPI = load(data.html);

    const epNoSelector: SelectorType = ".server-notice strong";
    res.episodeNo = Number($(epNoSelector).text().split(" ").pop()) || 0;

    $(`.ps_-block.ps_-block-sub.servers-sub .ps__-list .server-item`).each(
      (_, el) => {
        res.sub.push({
          serverName: $(el).find("a").text().toLowerCase().trim(),
          serverId: Number($(el)?.attr("data-server-id")?.trim()) || null,
        });
      },
    );

    $(`.ps_-block.ps_-block-sub.servers-dub .ps__-list .server-item`).each(
      (_, el) => {
        res.dub.push({
          serverName: $(el).find("a").text().toLowerCase().trim(),
          serverId: Number($(el)?.attr("data-server-id")?.trim()) || null,
        });
      },
    );

    return res;
  } catch (err: any) {
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
