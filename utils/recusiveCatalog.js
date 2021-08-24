import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';

export const catalog = async () => {
	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});

	const recursiveCatalog = async (cursor = '', initialRequest = true) => {
		let opts = 'ITEM';
		const catalog = client.catalogApi;

		const response = await catalog.listCatalog(cursor, opts);
		const data = JSONBig.parse(JSONBig.stringify(response.result.objects));
		const newCursor = response.result.cursor;

		if (initialRequest && cursor === '') {
			return data.concat(await recursiveCatalog(newCursor, false));
		} else if (!initialRequest && !cursor) {
			return data;
		} else {
			return data.concat(await recursiveCatalog(newCursor, false));
		}
	};

	const newImageRequest = async (items) => {
		const catalog = client.catalogApi;

		let newItemsWithPictures = [];

		for (let i = 0; i < items.length; i++) {
			const response = await catalog.retrieveCatalogObject(items[i].imageId);
			items[i].imageLink = response.result.object.imageData.url;
			newItemsWithPictures.push(items[i]);
		}
		return newItemsWithPictures;
	};

	let items = [];
	let filteredItems = [];

	//This grabs the entire catalog at once through recursion
	items = await recursiveCatalog();

	//Then the items are filtered so that only ones that have photo's are returned
	if (items) {
		const dataItems = items;
		for (let i = 0; i < dataItems.length; i++) {
			if (dataItems[i].imageId) {
				filteredItems.push(dataItems[i]);
			}
		}

		//Finally, before returning the list of Items it grabs the URL for the photo's for each item -- This takes a while!
		const itemsWithPictures = await newImageRequest(filteredItems);

		return itemsWithPictures;
	}
};
