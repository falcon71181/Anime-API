import { isSiteReachable } from "../../lib/isSiteReachable";

const USER_AGENT_HEADER =
  "Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0";

const ACCEPT_ENCODING_HEADER = "gzip, deflate, br";

const ACCEPT_HEADER =
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";

// hianime.to
const URLs_hianime = {
  BASE: "https://hianime.to",
  HOME: "https://hianime.to/home",
  SEARCH: "https://hianime.to/search",
  GENRE: "https://hianime.to/genre",
  AJAX: "https://hianime.to/ajax",
};

// aniwatchtv.to
const URLs_aniwatchtv = {
  BASE: "https://aniwatchtv.to",
  HOME: "https://aniwatchtv.to/home",
  SEARCH: "https://aniwatchtv.to/search",
  GENRE: "https://aniwatchtv.to/genre",
  AJAX: "https://aniwatchtv.to/ajax",
};

// You can add SIMILAR SITES here and append if-else condition in URL_fn()
const URL_fn = async () => {
  try {
    const reachable = await isSiteReachable(URLs_aniwatchtv.BASE);
    if (reachable) {
      // aniwatch.to is not working
      return URLs_aniwatchtv;
    } else {
      return URLs_hianime;
    }
  } catch (error) {
    console.error("Error occurred in both sites:", error);
    throw error; // Rethrow the error to handle it outside
  }
};

export { URL_fn, ACCEPT_HEADER, ACCEPT_ENCODING_HEADER, USER_AGENT_HEADER };
