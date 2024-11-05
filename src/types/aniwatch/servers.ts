import { SubEpisode, DubEpisode, RawEpisode } from "./anime";

export interface ScrapedEpisodeServer {
  episodeId: string;
  episodeNo: number;
  sub: SubEpisode[];
  dub: DubEpisode[];
  raw: RawEpisode[];
}
