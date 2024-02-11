import { Top10Anime } from "./anime";
import { SpotLightAnime } from "./anime";

export interface ScrapedHomePage {
  spotLightAnimes: SpotLightAnime[];
  trendingAnimes: {
    day: Top10Anime[];
    week: Top10Anime[];
    month: Top10Anime[];
  };
}
