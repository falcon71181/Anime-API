import {
  MinimalAnime,
  Top10Anime,
  SpotLightAnime,
  TopUpcomingAnime,
  LatestAnimeEpisode,
} from "./anime";

export interface ScrapedHomePage {
  spotLightAnimes: SpotLightAnime[];
  trendingAnimes: MinimalAnime[];
  top10Animes: {
    day: Top10Anime[];
    week: Top10Anime[];
    month: Top10Anime[];
  };
  latestEpisodes: LatestAnimeEpisode[];
  featuredAnimes: {
    topAiringAnimes: MinimalAnime[];
    mostPopularAnimes: MinimalAnime[];
    mostFavoriteAnimes: MinimalAnime[];
    latestCompletedAnimes: MinimalAnime[];
  }
  topUpcomingAnimes: TopUpcomingAnime[];
  genres: string[];
}
