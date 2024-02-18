import { SubEpisode, DubEpisode } from "./anime";

export interface ScrapedEpisodeServer {
  episodeId: string;
  episodeNo: number;
  sub: SubEpisode[];
  dub: DubEpisode[];
}
