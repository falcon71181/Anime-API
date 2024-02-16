import { Top10Anime, CategoryAnime } from "./anime";

export interface ScrapedCategoryPage {
  animes: CategoryAnime[];
  top10Animes: {
    day: Top10Anime[];
    week: Top10Anime[];
    month: Top10Anime[];
  };
  category: string;
  genres: string[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}
