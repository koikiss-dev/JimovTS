/***********************************************************************
 * 
 * 
 * 
 * 
 * 
 * 
 */


//Spanish Providers - TypeScript version

/**
 * This interface only puts the server name where host episode, 
* and url to that episode
*
 * @author Mawfyy 
 */
export interface IEpisodeServer {
  name: string | undefined;
  url: string | undefined;
}

/**
 * Specify the structure episode, in the first url field is anime's name
 * and the second is the episode number
 * 
 * @author Mawfyy 
 */
export interface IEpisode {
  name: string | undefined;
  url: `/anime/${string}/episode/${string | number}` | undefined;
  number: number | string | undefined;
  servers?: IEpisodeServer[];
  image: string | undefined;
}



export class EpisodeServer implements IEpisodeServer {
  name: string | undefined;
  url: string | undefined;
}

export class Episode implements IEpisode {
  name: string | undefined;
  url: `/anime/${string}/episode/${string | number}` | undefined;
  number: number | string | undefined;
  servers?: IEpisodeServer[] = [];
  image: string | undefined;
}