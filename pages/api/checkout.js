import {uuidv4} from 'uuid'

export default function checkout (req, res){
    const orderID = req.body.orderID;
	const items = req.body.lineItems;
	const checkoutID = uuidv4();

	try {
		const response = await client.checkoutApi.createCheckout('L0SCPZY3N0MGA', {
			idempotencyKey: checkoutID,
			order: {
				order: {
					locationId: 'L0SCPZY3N0MGA',
					lineItems: items,
					taxes: [
						{
							catalogObjectId: '5Z2DUEICONXUEQYFZG7GFOE5',
						},
					],
				},
				idempotencyKey: orderID,
			},
			askForShippingAddress: false,
			merchantSupportEmail: ' wemadeit.newcastle@gmail.com',
			redirectUrl: 'https://we-made-it.ca/checkout/checkoutCompleted',
		});
		console.log(response.result);
		res.json(JSONBig.parse(JSONBig.stringify(response.result)));
	} catch (error) {
		console.log(error);
		res.status(400).json('Error working with API', error);
	}
}