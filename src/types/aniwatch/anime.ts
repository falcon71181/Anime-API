import { ScrapedHomePage } from "./home";
import { ScrapedAboutPage } from "./about";
import { ScrapedSearchPage } from "./search";
import { ScrapedCategoryPage } from "./category";
import { ScrapedEpisodesPage } from "./episodes";
import { ScrapedEpisodeServer } from "./servers";
import { ScrapedAnimeEpisodesSources } from "./episode_server_source";
import { GetRoot } from "./root";

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

interface Episode {
  name: string | null;
  episodeNo: number | null;
  episodeId: string | null;
  filler: boolean | false;
}

interface SubEpisode {
  serverName: string;
  serverId: number | null;
}

type DubEpisode = SubEpisode;

interface Video {
  url: string;
  quality?: string;
  isM3U8?: boolean;
  size?: number;
  [x: string]: unknown;
}

interface Subtitle {
  id?: string;
  url: string;
  lang: string;
}

interface Intro {
  start: number;
  end: number;
}

type AnimeServers =
  | "vidstreaming"
  | "megacloud"
  | "streamsb"
  | "streamtape"
  | "vidcloud";

enum Servers {
  VidStreaming = "vidstreaming",
  MegaCloud = "megacloud",
  StreamSB = "streamsb",
  StreamTape = "streamtape",
  VidCloud = "vidcloud",
  AsianLoad = "asianload",
  GogoCDN = "gogocdn",
  MixDrop = "mixdrop",
  UpCloud = "upcloud",
  VizCloud = "vizcloud",
  MyCloud = "mycloud",
  Filemoon = "filemoon",
}

type Category =
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

type Genre =
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
  GetRoot,
  ScrapedHomePage,
  ScrapedAboutPage,
  ScrapedSearchPage,
  ScrapedCategoryPage,
  ScrapedEpisodesPage,
  ScrapedEpisodeServer,
  ScrapedAnimeEpisodesSources,
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
  Genre,
  Category,
  Episode,
  SubEpisode,
  DubEpisode,
  AnimeServers,
  Servers,
  Video,
  Subtitle,
  Intro,
};
