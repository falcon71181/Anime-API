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
  rank: Number | null;
}

type Top10AnimeTimePeriod = "day" | "week" | "month";

interface SpotLightAnime extends Anime {
  rank: Number | null;
  duration: String | null;
  category: String | null;
  releasedDay: String | null;
  quality: String | null;
  description: String | null;
}

export {
  ScrapedHomePage,
  Anime,
  Top10Anime,
  Top10AnimeTimePeriod,
  SpotLightAnime,
};
