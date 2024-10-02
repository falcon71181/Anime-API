import type { RecentRelease } from "./anime";

export interface ScrapedHomePage {
  genres: string[];
  recentReleases: RecentRelease[];
}
