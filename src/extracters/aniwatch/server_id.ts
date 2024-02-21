import type { CheerioAPI } from "cheerio";

export const extract_server_id = (
  $: CheerioAPI,
  index: number,
  category: "sub" | "dub",
) => {
  return (
    $(`.ps_-block.ps_-block-sub.servers-${category} > .ps__-list .server-item`)
      ?.map((_, el) =>
        $(el).attr("data-server-id") == `${index}` ? $(el) : null,
      )
      ?.get()[0]
      ?.attr("data-id") || null
  );
};
