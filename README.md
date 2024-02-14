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
  latestEpisodes: [
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


### `GET` Anime About Info

#### Endpoint

```sh
http://localhost:3001/aniwatch/:id
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|   `id`    | string |          The unique Anime ID         |    YES    |  -----  |

> [!NOTE]
> Anime ID should be In <b>Kebab Case</b>

#### Request sample

```javascript
const resp = await fetch(
  "http://localhost:3001/aniwatch/jujutsu-kaisen-2nd-season-18413"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

``` typescript
{
  "info": {
        "id": string,
        "name": string,
        "img": string,
        "rating": string,
        "episodes": {
            "eps": number,
            "sub": number,
            "dub": number
        },
        "category": string,
        "quality": string,
        "duration": string,
        "description": string
  },
  "moreInfo": {
        "Japanese:": string,
        "Synonyms:": string,
        "Aired:": string,
        "Premiered:": string,
        "Duration:": string,
        "Status:": string,
        "MAL Score:": string,
        "Studios:": string[],
        "Genres": string[],
        "Producers": string[]
    },
  "seasons": [
        {
            "id": string,
            "name": string,
            "seasonTitle": string,
            "img": string,
            "isCurrent": boolean
        },
        {...},
  },
  "relatedAnimes": [
        {
            "id": string,
            "name": string,
            "category": string,
            "img": string,
            "episodes": {
                "eps": number,
                "sub": number,
                "dub": number
            }
        },
        {...},
    ],
  "recommendedAnimes": [
        {
            "id": string,
            "name": string,
            "img": string,
            "episodes": {
                "eps": number,
                "sub": number,
                "dub": number
            },
            "duration": string,
            "rated": boolean
        },
        {...},
  ],
  "mostPopularAnimes": [
        {
            "id": string,
            "name": string,
            "category": string,
            "img": string,
            "episodes": {
                "eps": number,
                "sub": number,
                "dub": number
            }
        },
        {...},
  ],
}
```
