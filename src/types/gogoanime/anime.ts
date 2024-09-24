interface Anime {
  id: string | null;
  name: string | null;
  img: string | null;
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
interface AnimeMovie extends NewSeason {}
interface TopAiring {
  id: string;
  name: string;
  img: string;
  latestEp: string;
  animeUrl: string;
  genres: string[];
}

interface SearchedAnime extends Anime {
  releasedYear: string | null;
}

export {
  RecentRelease,
  NewSeason,
  PopularAnime,
  AnimeMovie,
  TopAiring,
  SearchedAnime,
};
