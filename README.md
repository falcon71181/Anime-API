> [!IMPORTANT]
> <img src="https://media.tenor.com/xTujfMHupbEAAAAi/under-construction-lex.gif"></img><h6> Currently Working On It</h6>

## ⚡ Web Scraping Status

Anime Websites  |    STATUS
--------------  | -------------
aniwatch.to     | <kbd>Working On It</kbd>

>[!NOTE]
>More Websites Will be Added in Future

### `GET` AniWatch Home Page

#### Endpoint

```url
https://api-anime-rouge.vercel.app/aniwatch/
```

#### Request sample

```typescript
const resp = await fetch("https://api-anime-rouge.vercel.app/aniwatch/");
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
https://api-anime-rouge.vercel.app/aniwatch/anime/:id
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|   `id`    | string |          The unique Anime ID         |    YES    |  -----  |

> [!NOTE]
> Anime ID should be In <kbd><b>Kebab Case</b></kbd>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/aniwatch/anime/jujutsu-kaisen-2nd-season-18413"
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

### `GET` Search Anime

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/aniwatch/search?keyword=$(query)&page=$(page)
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|  `query`  | string |         Search Query for Anime       |    YES    |  -----  |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |
> [!NOTE]
> <div>Search Query should be In <kbd><b>Kebab Case</b></kbd></div>
> <div>Page No should be a <kbd><b>Number</b></kbd></b></div>
#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/aniwatch/search?keyword=one+piece&page=1"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
{
  "animes": [
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
  "currentPage": number,
  "hasNextPage": boolean,
  "totalPages": number,
  "genres": string[]
}
```

### `GET` Search Anime

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/aniwatch/:category?page=$(page)
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
| `category`| string |         Search Query for Anime       |    YES    |  -----  |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |

<break>

> [!NOTE]
> <div>category should be In <kbd><b>Kebab Case</b></kbd></div>
> <div>Page No should be a <kbd><b>Number</b></kbd></b></div>

<break>
  
> [!TIP]
> Add type to Category - "subbed-anime" | "dubbed-anime" | "tv" | "movie" | "most-popular" | "top-airing" | "ova" | "ona" | "special" | "events";

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/aniwatch/ona?page=1"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
{
  "animes": [
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
  "top10Animes": {
        "day": [
            {
                "id": string,
                "name": string,
                "rank": number,
                "img": string,
                "episodes": {
                    "eps": number,
                    "sub": number,
                    "dub": number
                }
            },
            {..},
        ],
        "week": [
            {
                "id": string,
                "name": string,
                "rank": number,
                "img": string,
                "episodes": {
                    "eps": number,
                    "sub": number,
                    "dub": number
                }
            },
            {...},
        ],
        "month": [
            {
                "id": string,
                "name": string,
                "rank": number,
                "img": string,
                "episodes": {
                    "eps": number,
                    "sub": number,
                    "dub": number
                }
            },
            {...},
        ],
  "category": string,
  "genres": string[],
  "currentPage": number,
  "hasNextPage": boolean,
  "totalPages": number
}
```
