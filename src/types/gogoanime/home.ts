import type { RecentRelease, Anime } from "./anime";

export interface ScrapedHomePage {
  genres: string[];
  recentReleases: RecentRelease[];
  recentlyAddedSeries: Anime[];
  onGoingSeries: Anime[];
}
