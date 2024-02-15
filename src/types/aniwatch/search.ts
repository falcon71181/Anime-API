import internal from "stream";
import { SearchedAnime, MostPopularAnime } from "./anime";

export interface ScrapedSearchPage {
  animes: SearchedAnime[];
  mostPopularAnimes: MostPopularAnime[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}
