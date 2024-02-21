import type { Intro, Subtitle, Video } from "./anime";

export interface ScrapedAnimeEpisodesSources {
  headers?: {
    [k: string]: string;
  };
  intro?: Intro;
  subtitles?: Subtitle[];
  sources: Video[];
  download?: string;
  embedURL?: string;
}
