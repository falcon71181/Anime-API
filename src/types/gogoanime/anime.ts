import { ScrapedRecentReleases } from "./recent-releases";

interface Anime {
  id: string | null;
  name: string | null;
  img: string | null;
}

interface RecentReleases extends Anime {
  episodeId: string;
  episodeNo: number;
  subOrDub: string;
  episodeUrl: string;
}

export { ScrapedRecentReleases, RecentReleases };
