import { AboutAnimeInfo, ExtraAboutAnimeInfo, AnimeSeasonsInfo } from "./anime";

export interface ScrapedAboutPage {
  info: AboutAnimeInfo;
  moreInfo: ExtraAboutAnimeInfo;
  seasons: AnimeSeasonsInfo[];
}
