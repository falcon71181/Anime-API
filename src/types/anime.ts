export interface Anime {
  id: string | null;
  name: string | null;
  img: string | null;
  episodes: {
    eps: number | null;
    sub: number | null;
    dub: number | null;
  };
}

export interface Top10Anime extends Anime {
  rank: Number | null;
}

export type Top10AnimeTimePeriod = "day" | "week" | "month";
