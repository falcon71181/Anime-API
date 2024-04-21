import { isSiteReachable } from "../../lib/isSiteReachable";
import { websites_collection, AnimeWebsiteConfig } from "../../config/websites";

type AniWatchConfig = {
  BASE: string,
  HOME: string,
  SEARCH: string,
  GENRE: string,
  AJAX: string,
}

const aniwatch: AnimeWebsiteConfig = websites_collection["AniWatch"];

// TODO: use while loop find best responsive site or clone site
const aniwatch_base = aniwatch.BASE;

const aniwatchObj: AniWatchConfig = {
  BASE: aniwatch_base,
  HOME: `${aniwatch_base}/home`,
  SEARCH: `${aniwatch_base}/search`,
  GENRE: `${aniwatch_base}/genre`,
  AJAX: `${aniwatch_base}/ajax`,
}

// You can add SIMILAR SITES here and append if-else condition in URL_fn()
const URL_fn = async () => {
  try {
    const reachable = await isSiteReachable(aniwatch_base);
    if (reachable) {
      // aniwatch.to is not working
      return aniwatchObj;
    } else {
      return aniwatchObj;
    }
  } catch (error) {
    console.error("Error occurred in both sites:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

export { URL_fn };
