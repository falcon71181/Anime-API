import {
  AboutAnimeInfo,
  ExtraAboutAnimeInfo,
  AnimeSeasonsInfo,
  RelatedAnime,
} from "./anime";

export interface ScrapedAboutPage {
  info: AboutAnimeInfo;
  moreInfo: ExtraAboutAnimeInfo;
  seasons: AnimeSeasonsInfo[];
  relatedAnimes: RelatedAnime[];
}
