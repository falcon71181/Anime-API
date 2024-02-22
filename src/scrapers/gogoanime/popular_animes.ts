export const scrapePopularAnime = async ({ list = [], page = 1 }) => {
  try {
    const popularPage = await axios.get(`
        ${BASE_URL + popular_path}?page=${page}
       `);
    const $ = cheerio.load(popularPage.data);

    $("div.last_episodes > ul > li").each((i, el) => {
      list.push({
        animeId: $(el).find("p.name > a").attr("href").split("/")[2],
        animeTitle: $(el).find("p.name > a").attr("title"),
        animeImg: $(el).find("div > a > img").attr("src"),
        releasedDate: $(el)
          .find("p.released")
          .text()
          .replace("Released: ", "")
          .trim(),
        animeUrl: BASE_URL + "/" + $(el).find("p.name > a").attr("href"),
      });
    });
    return list;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
