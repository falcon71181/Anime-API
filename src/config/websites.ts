type WebsiteConfig = {
  BASE: string;
};

export type AnimeWebsiteConfig = WebsiteConfig & {
  CLONES?: Record<string, string[]>;
};

type Websites = Record<string, AnimeWebsiteConfig>;

// anime websites and their clones
export const websites_collection: Websites = {
  AniWatch: {
    BASE: "https://aniwatchtv.to",
    CLONES: {
      HiAnime: [
        "https://hianimez.is",
        "https://hianimez.to",
        "https://hianime.nz",
        "https://hianime.bz",
        "https://hianime.pe",
      ],
    },
  },
  GogoAnime: {
    BASE: "https://ww24.gogoanimes.fi",
  },
};
