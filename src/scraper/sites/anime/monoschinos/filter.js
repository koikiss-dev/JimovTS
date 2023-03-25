import { AnimeSearch, SearchArray } from "../../../../utils/schemaProviders.js";
import page from "./Page.js";
import utilities from "../../../../utils/utilities.js"

/**
 * @param {string} category 
 * @param {string} genre 
 * @param {string} year 
 * @param {string} letter 
 * @returns 
 */
async function filter(category, genre, year, letter) {
	const animes = new SearchArray('1');
	
	// the function getLastAnimes returns an array of type Anime no matter
	// if the array is empty, it never returns null
	(await page.getLastAnimes(`https://monoschinos2.com/animes?categoria=${category ?? false}&genero=${genre ?? false}&fecha=${year ?? false}&letra=${letter ?? false}`))
		.forEach(element => {
			if (utilities.isUsableValue(element)) {
				animes.data.push(new AnimeSearch(element.name, element.image.url, element.url, category))
			}
		});
	return animes;
}

//console.log(await filter('anime', 'accion', 2018, 'k'))

export default { filter };

