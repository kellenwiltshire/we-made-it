import { categories } from './options';

export const filterChange = (param, initialItems) => {
	let filteredItems = initialItems;

	filteredItems = filteredItems.filter((item) => {
		if (item.itemData.description) {
			let fixedDescription = item.itemData.description.toLowerCase();
			let fixedFilterName = param.toLowerCase();
			return fixedDescription.includes(fixedFilterName);
		} else {
			return;
		}
	});

	return filteredItems;
};

export const sortChange = (param, items, initialItems) => {
	if (param === 'Name Ascending (A-Z)') {
		let sortedItems = items.sort((a, b) => {
			return a.itemData.name.localeCompare(b.itemData.name);
		});
		return sortedItems;
	} else if (param === 'Name Descending (Z-A)') {
		let sortedItems = items.sort((a, b) => {
			return a.itemData.name.localeCompare(b.itemData.name);
		});
		sortedItems.reverse();
		return sortedItems;
	} else if (param === 'Price (Low to High)') {
		let sortedItems = items.sort((a, b) => {
			if (a.itemData.variations && b.itemData.variations) {
				if (
					a.itemData.variations[0].itemVariationData.pricingType ===
						'VARIABLE_PRICING' ||
					b.itemData.variations[0].itemVariationData.pricingType ===
						'VARIABLE_PRICING'
				) {
					return 0;
				} else if (
					a.itemData.variations[0].itemVariationData.priceMoney.amount >
					b.itemData.variations[0].itemVariationData.priceMoney.amount
				) {
					return 1;
				} else if (
					a.itemData.variations[0].itemVariationData.priceMoney.amount <
					b.itemData.variations[0].itemVariationData.priceMoney.amount
				) {
					return -1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		});
		return sortedItems;
	} else if (param === 'Price (High to Low)') {
		let sortedItems = items.sort((a, b) => {
			if (a.itemData.variations && b.itemData.variations) {
				if (
					a.itemData.variations[0].itemVariationData.pricingType ===
						'VARIABLE_PRICING' ||
					b.itemData.variations[0].itemVariationData.pricingType ===
						'VARIABLE_PRICING'
				) {
					return 0;
				} else if (
					a.itemData.variations[0].itemVariationData.priceMoney.amount >
					b.itemData.variations[0].itemVariationData.priceMoney.amount
				) {
					return 1;
				} else if (
					a.itemData.variations[0].itemVariationData.priceMoney.amount <
					b.itemData.variations[0].itemVariationData.priceMoney.amount
				) {
					return -1;
				} else {
					return 0;
				}
			} else {
				return 0;
			}
		});
		sortedItems.reverse();
		return sortedItems;
	} else {
		return initialItems;
	}
};

export const locationChange = (param, initialItems) => {
	const newcastleStore = 'L0SCPZY3N0MGA';
	const cobourgStore = 'LQQF7JXRMNY9M';
	let filteredItems = initialItems;

	if (param === 'Newcastle') {
		filteredItems = filteredItems.filter((item) => {
			if (item.presentAtLocationIds) {
				return item.presentAtLocationIds.includes(newcastleStore);
			} else {
				return;
			}
		});
	} else if (param === 'Cobourg') {
		filteredItems = filteredItems.filter((item) => {
			if (item.presentAtLocationIds) {
				return item.presentAtLocationIds.includes(cobourgStore);
			} else {
				return;
			}
		});
	}

	return filteredItems;
};

export const vendorLocationChange = (param, vendors) => {
	let filteredVendors = vendors;
	if (param === 'Newcastle') {
		filteredVendors = filteredVendors.filter((vendor) => {
			if (vendor.location) {
				return vendor.location.includes('Newcastle');
			} else {
				return;
			}
		});
	} else if (param === 'Cobourg') {
		filteredVendors = filteredVendors.filter((vendor) => {
			if (vendor.location) {
				return vendor.location.includes('Cobourg');
			} else {
				return;
			}
		});
	}

	return filteredVendors;
};

export const categoryChange = (param, initialItems) => {
	let filteredItems = initialItems;
	const selectedCategory = categories.filter((cat) => {
		if (cat === param) {
			return cat;
		} else {
			return;
		}
	});
	filteredItems.filter((item) => {
		//IF ITEM.CATEGORY === selectedCategory THEN RETURN ITEM, ELSE RETURN NOTHING.
	});
};
