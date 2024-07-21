# ⚡Anime-API⚡
<p align="center">
  <img src="https://skillicons.dev/icons?i=ts,express,nodejs,docker" />
  <br/>
  <a href="https://api-anime-rouge.vercel.app"><kbd>api-anime-rouge.vercel.app</kbd></a>
</p>
<br/><br/>

Check it out at <a href="https://api-anime-rouge.vercel.app"><kbd>api-anime-rouge.vercel.app</kbd></a>.

<break>

## ⚡ Web Scraping Status

Anime Websites  |    STATUS
--------------  | -------------
aniwatch        | <b>DONE</b>
gogoanime       | <b>WORKING ON IT</b>
kickassanime    | <b>IN FUTURE</b>

>[!NOTE]
>More Websites Will be Added in Future

## Index

- [AniWatch](#aniwatch)
- [GogoAnime](#gogoanime)

##  <span id="aniwatch">AniWatch</span>

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

### `GET` AniWatch A to Z List Page

#### Endpoint

```url
https://api-anime-rouge.vercel.app/aniwatch/az-list?page=${page}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |


#### Request sample

```typescript
const resp = await fetch("https://api-anime-rouge.vercel.app/aniwatch/az-list?page=69");
const data = await resp.json();
console.log(data);
```

#### Response Schema

```typescript
[
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

### `GET` Anime Episodes

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/aniwatch/episodes/:id
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|    `id`   | string |               Anime ID               |    YES    |  -----  |

<break>

> [!NOTE]
> <div>Anime ID should be In <kbd><b>Kebab Case</b></kbd></div>

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/aniwatch/episodes/one-piece-100"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
{
  "totalEpisodes": number,
  "episodes": [
      {
          "name": string,
          "episodeNo": number,
          "episodeId": string,
          "filler": boolean
      },
      {...},
  ]
}
```

### `GET` Anime Episodes Servers

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/aniwatch/servers?id=${id}
```

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|    `id`   | string |              Episode ID              |    YES    |  -----  |

<break>

> [!NOTE]
> <div>Episode ID should be In <kbd><b>Kebab Case</b></kbd></div>

important 

> [!NOTE]
> <div><kbd><b>id</b></kbd> is a combination of AnimeId and EpisodeId</div>

eg.
```bash
one-piece-100?ep=84802
```

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/aniwatch/servers?id=one-piece-100?ep=84802"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
{
  "episodeId": string,
  "episodeNo": number,
  "sub": [
    {
      "serverName": string,
      "serverId": number
    },
    {...},
  ],
  "dub": [
    {
      "serverName": string,
      "serverId": number
    },
    {...},
  ],
}
```


### `GET` Anime Episode Streaming Source Links

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/anime/episode-srcs?id={episodeId}&server={server}&category={category}
```

#### Query Parameters

| Parameter  |  Type  |                  Description                  | Required? |     Default      |
| :--------: | :----: | :-------------------------------------------: | :-------: | :--------------: |
|    `id`    | string |                  episode Id                   |    Yes    |        --        |
|  `server`  | string |                  server name.                 |    No     | `"vidstreaming"` |
| `category` | string | The category of the episode ('sub' or 'dub'). |    No     |     `"sub"`      |

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/aniwatch/episode-srcs?id=solo-leveling-18718?ep=120094&server=vidstreaming&category=sub"
);
const data = await resp.json();
console.log(data);
```
> [!CAUTION]
> decryption key changes frequently ..., it sometime may not work

<break>
  
#### Response Schema

```typescript
{
  headers: {
    Referer: string,
    "User-Agent": string,
    ...
  },
  sources: [
    {
      url: string,
      isM3U8: boolean,
      quality?: string,
    },
    {...}
  ],
  subtitles: [
    {
      lang: "English",
      url: string,
    },
    {...}
  ],
  anilistID: number | null,
  malID: number | null,
}
```

<break>

##  <span id="gogoanime">GoGoAnime</span>

### `GET` GoGoAnime Recent Releases

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/gogoanime/recent-releases?page=${page}
```
<break>

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/gogoanime/recent-releases"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
[
  {
      "id": string,
      "name": string,
      "img": string,
      "episodeId": string,
      "episodeNo": number,
      "episodeUrl": string,
      "subOrDub": string   // "SUB" | "DUB"
  },
  {...},
]
```

<break>

### `GET` GoGoAnime New Seasons

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/gogoanime/new-seasons?page=${page}
```

<break>

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/gogoanime/new-seasons"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
[
  {
      "id": string,
      "name": string,
      "img": string,
      "releasedYear": string,
      "animeUrl": string
  },
  {...},
]
```

<break>

### `GET` GoGoAnime Popular

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/gogoanime/popular?page=${page}
```

<break>

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/gogoanime/popular"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
[
  {
      "id": string,
      "name": string,
      "img": string,
      "releasedYear": string,
      "animeUrl": string
  },
  {...},
]
```

<break>



### `GET` GoGoAnime Anime Movies

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/gogoanime/anime-movies?page=${page}
```

<break>

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/gogoanime/anime-movies"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
[
  {
      "id": string,
      "name": string,
      "img": string,
      "releasedYear": string,
      "animeUrl": string
  },
  {...},
]
```

<break>

### `GET` GoGoAnime Top Airing

#### Endpoint

```sh
https://api-anime-rouge.vercel.app/gogoanime/top-airing?page=${page}
```

<break>

#### Query Parameters

| Parameter |  Type  |             Description              | Required? | Default |
| :-------: | :----: | :----------------------------------: | :-------: | :-----: |
|  `page`   | number |        Page No. of Search Page       |    YES    |    1    |

<break>

#### Request sample

```javascript
const resp = await fetch(
  "https://api-anime-rouge.vercel.app/gogoanime/top-airing"
);
const data = await res.json();
console.log(data);
```

#### Response Schema

```typescript
[
  {
      "id": string,
      "name": string,
      "img": string,
      "latestEp": string,
      "animeUrl": string,
      "genres": string[]
  },
  {...},
]
```
<break>
#############################################################################

## <span>🖱️ For Front End</span>

> [!TIP]
> Kindly use this repo to make Front End

  - [Eltik / Anify](https://github.com/Eltik/Anify) 
  
#############################################################################

## <span>🤝 Thanks ❤️</span>

- [consumet.ts](https://github.com/consumet/consumet.ts)
- [ghoshRitesh12](https://github.com/ghoshRitesh12)
