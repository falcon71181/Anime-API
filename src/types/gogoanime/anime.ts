import type { ScrapedHomePage } from "./home";
import type { ScrapedEpisodes } from "./episodes";

interface Anime {
  id: string | null;
  name: string | null;
  img: string | null;
}

interface Episode {
  id: string;
  title: string;
  link: string;
}

interface AboutAnimeInfo {
  name: string | null;
  img: string | null;
  type: string | null;
  genre: string[] | null;
  status: string | null;
  aired_in: number | null;
  other_name: string | null;
  episodes: number | null;
}

interface RecentRelease extends Anime {
  episodeId: string;
  episodeNo: number;
  subOrDub: string;
  episodeUrl: string;
}

interface NewSeason extends Anime {
  releasedYear: string;
  animeUrl: string;
}

interface PopularAnime extends NewSeason {}
interface CompletedAnime extends NewSeason {}
interface AnimeMovie extends NewSeason {}
interface TopAiring extends Anime {
  latestEp: string;
  animeUrl: string;
  genres: string[];
}

interface SearchedAnime extends Anime {
  releasedYear: string | null;
}

export type {
  ScrapedHomePage,
  ScrapedEpisodes,
  RecentRelease,
  Anime,
  NewSeason,
  PopularAnime,
  CompletedAnime,
  AnimeMovie,
  TopAiring,
  SearchedAnime,
  AboutAnimeInfo,
  Episode,
};
