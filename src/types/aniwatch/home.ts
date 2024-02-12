import {
  Top10Anime,
  SpotLightAnime,
  TrendingAnime,
  TopAiringAnime,
  TopUpcomingAnime,
} from "./anime";

export interface ScrapedHomePage {
  spotLightAnimes: SpotLightAnime[];
  trendingAnimes: TrendingAnime[];
  top10Animes: {
    day: Top10Anime[];
    week: Top10Anime[];
    month: Top10Anime[];
  };
  topAiringAnimes: TopAiringAnime[];
  topUpcomingAnimes: TopUpcomingAnime[];
  genres: string[];
}
