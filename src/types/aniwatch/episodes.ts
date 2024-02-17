import { Episode } from "./anime";

export interface ScrapedEpisodesPage {
  totalEpisodes: number;
  episodes: Episode[];
}
