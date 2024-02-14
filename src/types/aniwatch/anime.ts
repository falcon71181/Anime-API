import { ScrapedHomePage } from "./home";
import { ScrapedAboutPage } from "./about";

interface MinimalAnime {
  id: string | null;
  name: string | null;
  img: string | null;
}

interface Anime extends MinimalAnime {
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

type TopAiringAnime = MinimalAnime;
type TrendingAnime = MinimalAnime;

interface TopUpcomingAnime extends Anime {
  duration: string | null;
  rated: boolean | false;
}

type LatestAnimeEpisode = TopUpcomingAnime;

interface AboutAnimeInfo extends Anime {
  rating: string | null;
  category: string | null;
  duration: string | null;
  quality: string | null;
  description: string | null;
}

type ExtraAboutAnimeInfo = Record<string, string | string[]>;

interface AnimeSeasonsInfo extends MinimalAnime {
  seasonTitle: string | null;
  isCurrent: boolean | false;
}

interface RelatedAnime extends Anime {
  category: string | null;
}

type RecommendedAnime = TopUpcomingAnime;

export {
  ScrapedHomePage,
  ScrapedAboutPage,
  Anime,
  Top10Anime,
  Top10AnimeTimePeriod,
  SpotLightAnime,
  TrendingAnime,
  TopAiringAnime,
  TopUpcomingAnime,
  LatestAnimeEpisode,
  AboutAnimeInfo,
  ExtraAboutAnimeInfo,
  AnimeSeasonsInfo,
  RelatedAnime,
  RecommendedAnime,
};
