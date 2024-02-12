import { ScrapedHomePage } from "./home";

interface Anime {
  id: string | null;
  name: string | null;
  img: string | null;
  episodes: {
    eps: number | null;
    sub: number | null;
    dub: number | null;
  };
}

interface Top10Anime extends Anime {
  rank: number | null;
}

type Top10AnimeTimePeriod = "day" | "week" | "month";

interface SpotLightAnime extends Anime {
  rank: number | null;
  duration: string | null;
  category: string | null;
  releasedDay: string | null;
  quality: string | null;
  description: string | null;
}

interface TrendingAnime {
  id: string | null;
  name: string | null;
  img: string | null;
}

interface TopAiringAnime {
  id: string | null;
  name: string | null;
  img: string | null;
}

interface TopUpcomingAnime extends Anime {
  duration: string | null;
  rated: boolean | null;
}

export {
  ScrapedHomePage,
  Anime,
  Top10Anime,
  Top10AnimeTimePeriod,
  SpotLightAnime,
  TrendingAnime,
  TopAiringAnime,
  TopUpcomingAnime,
};
