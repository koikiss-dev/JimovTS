import axios from "axios";
import * as ch from "cheerio";
import { AnimeSearch, SearchArray } from "../../../../utils/schemaProviders.js";

//https://zoro.to/filter?type=2&rated=1&score=1&season=1&language=1&sy=2023&sort=recently_updated&genres=1
const url_zoro = "https://zoro.to";

const params = [
  {
    type_anime: [
      {
        id: 1,
        value: "Movie",
        id: 2,
        value: "TV",
        id: 3,
        value: "OVA",
        id: 4,
        value: "ONA",
        id: 5,
        value: "Special",
        id: 6,
        value: "Music",
      },
    ],
    rated: [
      {
        id: 1,
        value: "G",
        id: 2,
        value: "PG",
        id: 3,
        value: "PG-13",
        id: 4,
        value: "R",
        id: 5,
        value: "R+",
        id: 6,
        value: "Rx",
      },
    ],
    score: [
      {
        id: 1,
        value: "Appalling",
        id: 2,
        value: "Horrible",
        id: 3,
        value: "Very Bad",
        id: 4,
        value: "Bad",
        id: 5,
        value: "Average",
        id: 6,
        value: "Fine",
        id: 7,
        value: "Good",
        id: 8,
        value: "Very Good",
        id: 9,
        value: "Great",
        id: 10,
        value: "Masterpiece",
      },
    ],
    season: [
      {
        id: 1,
        value: "Spring",
        id: 2,
        value: "Summer",
        id: 3,
        value: "Fall",
        id: 4,
        value: "Winter",
      },
    ],
    languaje: [
      {
        id: 1,
        value: "SUB",
        id: 2,
        value: "DUB",
        id: 3,
        value: "SUB & DUB",
      },
    ],
    sort: [
      {
        id: 1,
        value: "Recently Added",
        id: 2,
        value: "Recently Updated",
        id: 3,
        value: "Score",
        id: 4,
        value: "Name A-Z",
        id: 5,
        value: "Released Date",
        id: 6,
        value: "Most Watched",
      },
    ],
    /* genres: [
      {
        id: 1,
        value,
      },
    ], */
  },
];

async function filterAnime(
  type,
  rated,
  score,
  season,
  languaje,
  sort,
  genres,
  page_anime
) {
  const error_page = [
    {
      error: "Invalid or incompleted param",
      valids_params: params,
      code: 404,
      value: false,
    },
  ];
  try {
    const { data } = await axios.get(`${url_zoro}/filter`, {
      params: {
        type: type,
        rated: rated,
        score: score,
        season: season,
        languaje: languaje,
        sort: sort,
        genres: genres,
        page: page_anime || 1,
      },
    });
    const $ = ch.load(data);
    const most_cards = $("div.film_list div.film_list-wrap div.flw-item");
    const page_index = $("div.pre-pagination nav ul li.active");

    const data_return = new SearchArray();
    most_cards.each((i, e) => {
      const anime = new AnimeSearch(
        $(e).find("a.dynamic-name").text().trim(),
        $(e)
          .find("div.film-poster")
          .find("img.film-poster-img")
          .attr("data-src"),
        `/anime/zoro/name${$(e).find("a.dynamic-name").attr("href")}`,
        $(e).find("div.fd-infor").children().first().text().trim()
      );
      data_return.data.push(anime);
    });
    page_index.each((i, e) => {
      data_return.page = $(e).children("a").text().trim();
    });
    return data_return;
  } catch (error) {
    return error_page;
  }
}

export default { filterAnime };
