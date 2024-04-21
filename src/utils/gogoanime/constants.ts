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
// storing initial base link
let gogoanime_base = gogoanime.BASE;
// array of clones
let clones_array: string[] = [];
clones_array.push(gogoanime_base);

if (gogoanime.CLONES) {
  const gogoanime_clones: Record<string, string[]> = gogoanime.CLONES;

  for (const key in gogoanime_clones) {
    if (Object.prototype.hasOwnProperty.call(gogoanime_clones, key)) {
      const values: string[] = gogoanime_clones[key];
      clones_array.push(...values);
    }
  }
}

// Testing
// console.log(clones_array);

// make new gogoanimeobj using new gogoanime_base
const makeGogoAnimeObj = (gogoanime_base: string): GogoAnimeConfig => {
  // Testing
  // console.log(gogoanime_base);
  return {
    BASE: gogoanime.BASE,
    SEARCH: `${gogoanime_base}/search.html`,
    CATEGORY: `${gogoanime_base}/category/`,
    MOVIES: `${gogoanime_base}/anime-movies.html`,
    POPULAR: `${gogoanime_base}/popular.html`,
    NEW_SEASON: `${gogoanime_base}/new-season.html`,
    SEASONS: `${gogoanime_base}/sub-category/`,
    AJAX: "https://ajax.gogocdn.net/ajax",
  }
}

// return fn
const URL_fn = async (): Promise<GogoAnimeConfig> => {
  try {
    for (const url of clones_array) {
      if (await isSiteReachable(url as string)) {
        gogoanime_base = url;
        break;
      }
    }
    return makeGogoAnimeObj(gogoanime_base as string);
  } catch (error) {
    console.error("Error occurred in both sites:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

export { URL_fn };
