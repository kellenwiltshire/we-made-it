import { v4 as uuidv4 } from 'uuid';
import Cors from 'cors';
import JSONBig from 'json-bigint';
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

const checkout = async (req, res) => {
	await runMiddleware(req, res, cors);

	console.log(req.body);

	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});
	const { orderID, locationId, lineItems } = req.body;
	const checkoutID = uuidv4();

	try {
		const response = await client.checkoutApi.createCheckout(locationId, {
			idempotencyKey: checkoutID,
			order: {
				order: {
					locationId: locationId,
					lineItems: lineItems,
					taxes: [
						{
							catalogObjectId: '5Z2DUEICONXUEQYFZG7GFOE5',
						},
					],
				},
				idempotencyKey: orderID,
			},
			askForShippingAddress: false,
			merchantSupportEmail: 'wemadeit.newcastle@gmail.com',
			redirectUrl: 'https://we-made-it.ca/checkout/checkoutCompleted',
		});
		console.log(response.result);
		const result = await JSONBig.stringify(response.result);
		res.json(JSONBig.parse(result));
	} catch (error) {
		console.log('ERROR: ', error);
		res.status(400).json('Error working with API', error);
	}
};

export default checkout;
