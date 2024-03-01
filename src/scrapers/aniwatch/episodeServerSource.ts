import {
  URL_fn,
  ACCEPT_HEADER,
  ACCEPT_ENCODING_HEADER,
  USER_AGENT_HEADER,
} from "../../utils/aniwatch/constants";
import axios, { AxiosError } from "axios";
import { load, type CheerioAPI } from "cheerio";
import createHttpError, { type HttpError } from "http-errors";
import { type AnimeServers, Servers } from "../../types/aniwatch/anime";
import { extract_server_id } from "../../extracters/aniwatch/extracters";
import RapidCloud from "../../utils/aniwatch/rapidcloud";
import StreamSB from "../../utils/aniwatch/streamsb";
import StreamTape from "../../utils/aniwatch/streamtape";
import MegaCloud from "../../utils/aniwatch/megacloud";
import { type ScrapedAnimeEpisodesSources } from "../../types/aniwatch/anime";

export const scrapeAnimeEpisodeSources = async (
  episodeId: string,
  server: AnimeServers = Servers.VidStreaming,
  category: "sub" | "dub" = "sub",
): Promise<ScrapedAnimeEpisodesSources | HttpError> => {
  const URLs = await URL_fn();

  if (episodeId.startsWith("http")) {
    const serverUrl = new URL(episodeId);
    switch (server) {
      case Servers.VidStreaming:
      case Servers.VidCloud:
        return {
          ...(await new MegaCloud().extract(serverUrl)),
        };
      case Servers.StreamSB:
        return {
          headers: {
            Referer: serverUrl.href,
            watchsb: "streamsb",
            "User-Agent": USER_AGENT_HEADER,
          },
          sources: await new StreamSB().extract(serverUrl, true),
        };
      case Servers.StreamTape:
        return {
          headers: { Referer: serverUrl.href, "User-Agent": USER_AGENT_HEADER },
          sources: await new StreamTape().extract(serverUrl),
        };
      default: // vidcloud
        return {
          headers: { Referer: serverUrl.href },
          ...(await new RapidCloud().extract(serverUrl)),
        };
    }
  }

  const epId = new URL(`/watch/${episodeId}`, URLs.BASE).href;
  console.log(epId);

  try {
    const resp = await axios.get(
      `${URLs.AJAX}/v2/episode/servers?episodeId=${epId.split("?ep=")[1]}`,
      {
        headers: {
          Referer: epId,
          "User-Agent": USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
        },
      },
    );

    const $: CheerioAPI = load(resp.data.html);

    let serverId: string | null = null;

    try {
      console.log("THE SERVER: ", server);

      switch (server) {
        case Servers.VidCloud: {
          serverId = extract_server_id($, 1, category);
          console.log("SERVER_ID: ", serverId);
          if (!serverId) throw new Error("RapidCloud not found");
          break;
        }
        case Servers.VidStreaming: {
          serverId = extract_server_id($, 4, category);
          console.log("SERVER_ID: ", serverId);
          if (!serverId) throw new Error("VidStreaming not found");
          break;
        }
        case Servers.StreamSB: {
          serverId = extract_server_id($, 5, category);
          console.log("SERVER_ID: ", serverId);
          if (!serverId) throw new Error("StreamSB not found");
          break;
        }
        case Servers.StreamTape: {
          serverId = extract_server_id($, 3, category);
          console.log("SERVER_ID: ", serverId);
          if (!serverId) throw new Error("StreamTape not found");
          break;
        }
      }
    } catch (err) {
      throw createHttpError.NotFound(
        "Couldn't find server. Try another server",
      );
    }

    const {
      data: { link },
    } = await axios.get(`${URLs.AJAX}/v2/episode/sources?id=${serverId}`);
    console.log("THE LINK: ", link);

    return await scrapeAnimeEpisodeSources(link, server);
  } catch (err: any) {
    console.log(err);
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
