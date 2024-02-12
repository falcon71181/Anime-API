> [!IMPORTANT]
> <img src="https://media.tenor.com/xTujfMHupbEAAAAi/under-construction-lex.gif"></img><h6> Currently Working On It</h6>
### `GET` AniWatch Home Page

#### Endpoint

```url
http://localhost:3001/aniwatch/
```

#### Request sample

```typescript
const resp = await fetch("http://localhost:3001/aniwatch/");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```typescript
{
  spotlightAnimes: [
    {
      id: string,
      name: string,
      rank: number,
      img: string,
      episodes: {
        eps: number,
        sub: number,
        dub: number,
      },
      duration: string,
      quality: string,
      category: string,
      releasedDay: string,
      descriptions: string,
    },
    {...},
  ],
  trendingAnimes: [
    {
      id: string,
      name: string,
      img: string,
    },
    {...},
  ],
  top10Animes: {
    day: [
      {
        id: string,
        name: string,
        rank: number,
        img: string,
        episodes: {
          eps: number,
          sub: number,
          dub: number,
        },
      },
      {...},
    ],
    week: [...],
    month: [...]
  },
  topAiringAnimes: [
    {
      id: string,
      name: string,
      img: string,
    },
    {...},
  ],
  topUpcomingAnimes: [
    {
      id: string,
      name: string,
      img: string,
      episodes: {
        eps: number,
        sub: number,
        dub: number,
      },
      duration: string,
      rated: boolean,
    },
    {...},
  ],
  genres: string[]
}
```
