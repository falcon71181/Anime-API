import { isSiteReachable } from "../../lib/isSiteReachable";
import { websites_collection, AnimeWebsiteConfig } from "../../config/websites";

type GogoAnimeConfig = {
  "BASE": string,
  "SEARCH": string,
  "CATEGORY": string,
  "MOVIES": string,
  "POPULAR": string,
  "NEW_SEASON": string,
  "SEASONS": string,
  "AJAX": string,
}

const gogoanime: AnimeWebsiteConfig = websites_collection["GogoAnime"];
const gogoanime_base = gogoanime.BASE;

// TODO: use while loop find best responsive site or clone site
// gogoanime3.co
const websiteObj: GogoAnimeConfig = {
  BASE: gogoanime.BASE,
  SEARCH: `${gogoanime_base}/search.html`,
  CATEGORY: `${gogoanime_base}/category/`,
  MOVIES: `${gogoanime_base}/anime-movies.html`,
  POPULAR: `${gogoanime_base}/popular.html`,
  NEW_SEASON: `${gogoanime_base}/new-season.html`,
  SEASONS: `${gogoanime_base}/sub-category/`,
  AJAX: "https://ajax.gogocdn.net/ajax",
}

// You can add SIMILAR SITES here and append if-else condition in URL_fn()
const URL_fn = async () => {
  try {
    const reachable = await isSiteReachable(gogoanime.BASE);
    if (reachable) {
      // aniwatch.to is not working
      return websiteObj;
    } else {
      return websiteObj;
    }
  } catch (error) {
    console.error("Error occurred in both sites:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

export { URL_fn };
