import { Top10Anime, SpotLightAnime, TrendingAnime } from "./anime";

export interface ScrapedHomePage {
  spotLightAnimes: SpotLightAnime[];
  trendingAnimes: TrendingAnime[];
  top10Animes: {
    day: Top10Anime[];
    week: Top10Anime[];
    month: Top10Anime[];
  };
}
