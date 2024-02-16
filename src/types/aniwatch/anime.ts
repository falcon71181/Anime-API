import { ScrapedHomePage } from "./home";
import { ScrapedAboutPage } from "./about";
import { ScrapedSearchPage } from "./search";
import { ScrapedCategoryPage } from "./category";

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
type MostPopularAnime = RelatedAnime;
type SearchedAnime = TopUpcomingAnime;
type CategoryAnime = TopUpcomingAnime;

type Categories =
  | "subbed-anime"
  | "dubbed-anime"
  | "tv"
  | "movie"
  | "most-popular"
  | "top-airing"
  | "ova"
  | "ona"
  | "special"
  | "events";

type Genres =
  | "Action"
  | "Adventure"
  | "Cars"
  | "Comedy"
  | "Dementia"
  | "Demons"
  | "Drama"
  | "Ecchi"
  | "Fantasy"
  | "Game"
  | "Harem"
  | "Historical"
  | "Horror"
  | "Isekai"
  | "Josei"
  | "Kids"
  | "Magic"
  | "Martial Arts"
  | "Mecha"
  | "Military"
  | "Music"
  | "Mystery"
  | "Parody"
  | "Police"
  | "Psychological"
  | "Romance"
  | "Samurai"
  | "School"
  | "Sci-Fi"
  | "Seinen"
  | "Shoujo"
  | "Shoujo Ai"
  | "Shounen"
  | "Shounen Ai"
  | "Slice of Life"
  | "Space"
  | "Sports"
  | "Super Power"
  | "Supernatural"
  | "Thriller"
  | "Vampire";

export {
  ScrapedHomePage,
  ScrapedAboutPage,
  ScrapedSearchPage,
  ScrapedCategoryPage,
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
  MostPopularAnime,
  SearchedAnime,
  CategoryAnime,
  Genres,
  Categories,
};
