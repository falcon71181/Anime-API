import { isSiteReachable } from "../../lib/isSiteReachable";

const USER_AGENT_HEADER =
  "Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0";

const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";

const ACCEPT_HEADER =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

// gogoanime3.co
const URLs_gogoanime3 = {
  BASE: "https://gogoanime3.co/",
  SEARCH: "https://gogoanime3.co/search.html",
  CATEGORY: "https://gogoanime3.co/category/",
  MOVIES: "https://gogoanime3.co/anime-movies.html",
  POPULAR: "https://gogoanime3.co/popular.html",
  NEW_SEASON: "https://gogoanime3.co/new-season.html",
  SEASONS: "https://gogoanime3.co/sub-category/",
  AJAX: "https://ajax.gogocdn.net/ajax",
};

// You can add SIMILAR SITES here and append if-else condition in URL_fn()
const URL_fn = async () => {
  try {
    const reachable = await isSiteReachable(URLs_gogoanime3.BASE);
    if (reachable) {
      // aniwatch.to is not working
      return URLs_gogoanime3;
    } else {
      return URLs_gogoanime3;
    }
  } catch (error) {
    console.error("Error occurred in both sites:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

export { URL_fn, ACCEPT_HEADER, ACCEPT_ENCODING_HEADER, USER_AGENT_HEADER };
