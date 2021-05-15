import Cors from 'cors';
import { Client, Environment } from 'square';

const cors = Cors({
	methods: ['POST', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
	return new Promise((resolve, reject) => {
		fn(req, res, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
}

const handleImageRequest = async (req, res) => {
	await runMiddleware(req, res, cors);
	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});

	const catalog = client.catalogApi;
	const item = req.body.item;

	try {
		const response = await catalog.retrieveCatalogObject(item);
		res.json({
			image: response.result.object.imageData.url,
		});
	} catch (error) {
		console.log(error);
		res.status(400).json('Error working with API', error);
	}
};

export default handleImageRequest;
