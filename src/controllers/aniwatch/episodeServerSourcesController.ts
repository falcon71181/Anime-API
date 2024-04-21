import axios from "axios";
import createHttpError from "http-errors";
import { type RequestHandler } from "express";
import { type CheerioAPI, load } from "cheerio";
import { scrapeAnimeEpisodeSources } from "../../scrapers/aniwatch/scrapers";
import { URL_fn } from "../../utils/aniwatch/constants";
import { headers } from "../../config/headers";
import { type AnimeServers, Servers } from "../../types/aniwatch/anime";

type AnilistID = number | null;
type MalID = number | null;

const getAnimeEpisodeSourcesInfo: RequestHandler = async (req, res) => {
  const URLs = await URL_fn();
  try {
    const episodeId = req.query.id
      ? decodeURIComponent(req.query.id as string)
      : null;

    const server = (
      req.query.server
        ? decodeURIComponent(req.query.server as string)
        : Servers.VidStreaming
    ) as AnimeServers;

    const category = (
      req.query.category
        ? decodeURIComponent(req.query.category as string)
        : "sub"
    ) as "sub" | "dub";

    if (episodeId === null) {
      throw createHttpError.BadRequest("Anime episode id required");
    }

    let malID: MalID;
    let anilistID: AnilistID;
    const animeURL = new URL(episodeId?.split("?ep=")[0], URLs.BASE)?.href;

    const [episodeSrcData, animeSrc] = await Promise.all([
      scrapeAnimeEpisodeSources(episodeId, server, category),
      axios.get(animeURL, {
        headers: {
          Referer: URLs.BASE,
          "User-Agent": headers.USER_AGENT_HEADER,
          "X-Requested-With": "XMLHttpRequest",
        },
      }),
    ]);

    const $: CheerioAPI = load(animeSrc?.data);

    try {
      anilistID = Number(
        JSON.parse($("body")?.find("#syncData")?.text())?.anilist_id,
      );
      malID = Number(JSON.parse($("body")?.find("#syncData")?.text())?.mal_id);
    } catch (err) {
      anilistID = null;
      malID = null;
    }

    res.status(200).json({
      ...episodeSrcData,
      anilistID,
      malID,
    });
  } catch (err) {
    ////////////////////////////////////
    console.log(err); // for TESTING//
    ////////////////////////////////////
  }
};

export { getAnimeEpisodeSourcesInfo };
