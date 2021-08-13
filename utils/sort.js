export const filterChange = (e, initialItems) => {
	let filteredItems = initialItems;

	filteredItems = filteredItems.filter((item) => {
		if (item.itemData.description) {
			let fixedDescription = item.itemData.description.toLowerCase();
			let fixedFilterName = e.target.value.toLowerCase();
			return fixedDescription.includes(fixedFilterName);
		} else {
			return;
		}
	});

	return filteredItems;
};

export const sortChange = (e, items, initialItems) => {
	if (e.target.value === 'Name Ascending (A-Z)') {
		let sortedItems = items.sort((a, b) => {
			return a.itemData.name.localeCompare(b.itemData.name);
		});
		return sortedItems;
	} else if (e.target.value === 'Name Descending (Z-A)') {
		let sortedItems = items.sort((a, b) => {
			return a.itemData.name.localeCompare(b.itemData.name);
		});
		sortedItems.reverse();
		return sortedItems;
	} else if (e.target.value === 'Price (Low to High)') {
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
	} else if (e.target.value === 'Price (High to Low)') {
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

export const locationChange = (e, initialItems) => {
	const newcastleStore = 'L0SCPZY3N0MGA';
	const cobourgStore = 'LQQF7JXRMNY9M';
	let filteredItems = initialItems;

	if (e.target.value === 'Newcastle') {
		filteredItems = filteredItems.filter((item) => {
			if (item.presentAtLocationIds) {
				return item.presentAtLocationIds.includes(newcastleStore);
			} else {
				return;
			}
		});
	} else if (e.target.value === 'Cobourg') {
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
