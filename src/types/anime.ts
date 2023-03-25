//anime data return standard

import { IDatePeriod } from './date';
import { IEpisode } from './episode';
import { IImage } from './image';

//spanish providers - TypeScript version

/** Specifies the type of anime to which its content refers. */
type AnimeType = "Anime" | "Movie" | "OVA" | "ONA";
/** Specify the climatic season in which the anime was published. */
type ClimaticStation = "Summer" | "Autumn" | "Winter" | "Spring";

/**Spectify the rating and stats in the anime **/
export interface IAnimeStats {
  score?: string | number;
  views?: string | number;
  rating?: string | number; // stars
}

/* Spectify chronology to that anime, in some pages puts what anime
 * should you see before to that anime 
 *
 * @author Mawfyy
 */
export interface IChronology {
  name: string | undefined;
  url: `/anime/${string}/name/${string}` | undefined;
  image?: string;
}

/* Spectify the anime strucutre that you scrapped */
export interface IAnime {
  name: string | undefined;
  alt_name?: string | string[] | undefined;
  id?: number | undefined;
  url: `/anime/${string}/name/${string}` | undefined;
  synopsis: string | undefined;
  image: IImage | undefined;
  date?: IDatePeriod;
  type?: AnimeType;
  genres: string[];
  station?: ClimaticStation;
  stats?: IAnimeStats;
  chronology?: IChronology[];
  episodes: IEpisode[];
  status?: string | boolean;
  nsfw?: boolean;
}

export class AnimeStats implements IAnimeStats {
  score?: string | number;
  views?: string | number;
  rating?: string | number; // stars
}

export class Chronology implements IChronology {
  name: string | undefined;
  url: `/anime/${string}/name/${string}` | undefined;
  image?: string | undefined;
}

export class Anime implements IAnime {
  name: string | undefined;
  alt_name?: string | string[];
  id?: number;
  url: `/anime/${string}/name/${string}` | undefined;
  synopsis: string | undefined;
  image: IImage | undefined;
  date?: IDatePeriod;
  type?: AnimeType;
  genres: string[] = [];
  stats?: IAnimeStats;
  station?: ClimaticStation;
  chronology?: IChronology[];
  episodes: IEpisode[] = [];
  status?: string | boolean;
  nsfw?: boolean;
}
