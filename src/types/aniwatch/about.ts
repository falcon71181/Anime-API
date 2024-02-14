import {
  AboutAnimeInfo,
  ExtraAboutAnimeInfo,
  AnimeSeasonsInfo,
  RelatedAnime,
  RecommendedAnime,
} from "./anime";

export interface ScrapedAboutPage {
  info: AboutAnimeInfo;
  moreInfo: ExtraAboutAnimeInfo;
  seasons: AnimeSeasonsInfo[];
  relatedAnimes: RelatedAnime[];
  recommendedAnimes: RecommendedAnime[];
}
