import { Top10Anime } from "../anime";

export interface ScrapedHomePage {
  trendingAnimes: {
    day: Array<Top10Anime>;
    week: Array<Top10Anime>;
    month: Array<Top10Anime>;
  };
}
