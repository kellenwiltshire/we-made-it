import React from 'react';
import { useEffect, useState } from 'react';
import JSONBig from 'json-bigint';
import { Client, Environment } from 'square';
import { checkSales } from '../../utils/sales';
import ProductSection from '../../components/Product/ProductSection';
import SEO from '../../components/SEO/SEO';

export default function ShopProduct({ data, vendorSales }) {
	const [isSale, setIsSale] = useState(false);
	const [itemID, setItemID] = useState(data.itemVarData[0].id);

	const itemLocations = data.itemVarData[0].presentAtLocationIds;

	let fixedItemLocation = [];
	itemLocations.map((loc) => {
		if (loc === 'L0SCPZY3N0MGA') {
			fixedItemLocation.push('Newcastle');
		} else if (loc === 'LQQF7JXRMNY9M') {
			fixedItemLocation.push('Cobourg');
		}
	});

	const setInitialPrice = () => {
		const checkSale = checkSales(data.itemDescription, vendorSales);

		if (checkSale) {
			setIsSale(true);
			if (
				data.itemVarData[0].itemVariationData.pricingType === 'VARIABLE_PRICING'
			) {
				const newPrice = 'VARAIBLE PRICING - Contact Store for Details';
				//Set Button to False to stop purchases online
				setButtonStatus(false);
				return newPrice;
			} else {
				console.log('HERE NOW');
				let vendor = vendorSales.filter((vendor) => {
					if (
						data.itemDescription
							.toLowerCase()
							.includes(vendor.vendor.toLowerCase())
					) {
						return vendor;
					} else {
						return;
					}
				});
				const currentPrice = (
					data.itemVarData[0].itemVariationData.priceMoney.amount / 100
				).toFixed(2);
				const newPrice = (
					currentPrice -
					currentPrice * (vendor[0].sale / 100)
				).toFixed(2);
				return newPrice;
			}
		} else {
			if (
				data.itemVarData[0].itemVariationData.pricingType === 'VARIABLE_PRICING'
			) {
				const newPrice = 'VARAIBLE PRICING - Contact Store for Details';
				//Set Button to False to stop purchases online
				setButtonStatus(false);
				return newPrice;
			} else {
				const newPrice = (
					data.itemVarData[0].itemVariationData.priceMoney.amount / 100
				).toFixed(2);
				return newPrice;
			}
		}
	};

	const [price, setPrice] = useState();

	useEffect(() => {
		setPrice(setInitialPrice());
	}, [vendorSales, itemID]);

	return (
		<div className='min-h-screen py-12 sm:pt-20'>
			<SEO title={`${data.itemName} || We Made It`} />
			<ProductSection
				productData={data}
				price={price}
				setPrice={setPrice}
				setItemID={setItemID}
				itemID={itemID}
				isSale={isSale}
				itemLocations={fixedItemLocation}
			/>
		</div>
	);
}

export async function getServerSideProps({ query }) {
	const item = query.product;

	const client = new Client({
		environment: Environment.Production,
		accessToken: process.env.SQUARE_ACCESS_TOKEN,
	});

	const catalog = client.catalogApi;

	const getProduct = async () => {
		const response = await catalog.retrieveCatalogObject(item);
		return response;
	};

	const product = await getProduct();

	if (product.result.object.imageId) {
		const picture = await catalog.retrieveCatalogObject(
			product.result.object.imageId,
		);
		const data = {
			itemID: JSONBig.parse(JSONBig.stringify(product.result.object.id)),
			itemName: product.result.object.itemData.name,
			itemDescription: product.result.object.itemData.description,
			itemVarData: JSONBig.parse(
				JSONBig.stringify(product.result.object.itemData.variations),
			),
			image: picture.result.object.imageData.url,
		};
		return {
			props: {
				data: data,
			},
		};
	} else {
		const data = {
			itemID: JSONBig.parse(JSONBig.stringify(product.result.object.id)),
			itemName: product.result.object.itemData.name,
			itemDescription: product.result.object.itemData.description,
			itemVarData: JSONBig.parse(
				JSONBig.stringify(product.result.object.itemData.variations),
			),
			image: '/pictureComingSoon.png',
		};
		return {
			props: {
				data: data,
			},
		};
	}
}
