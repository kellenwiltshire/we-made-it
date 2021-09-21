import { categories } from './options';

export const vendorChange = (param, initialItems) => {
	let filteredItems = initialItems;

	if (param === 'Vendors') {
		return initialItems;
	}

	filteredItems = filteredItems.filter((item) => {
		if (item.node.vendor) {
			let fixedVendor = item.node.vendor.toLowerCase();
			let fixedFilterName = param.toLowerCase();
			return fixedVendor.includes(fixedFilterName);
		} else {
			return;
		}
	});

	return filteredItems;
};

export const sortChange = (param, items, initialItems) => {
	if (param === 'Name Ascending (A-Z)') {
		let sortedItems = items.sort((a, b) => {
			return a.node.title.localeCompare(b.node.title);
		});
		return sortedItems;
	} else if (param === 'Name Descending (Z-A)') {
		let sortedItems = items.sort((a, b) => {
			return a.node.title.localeCompare(b.node.title);
		});
		sortedItems.reverse();
		return sortedItems;
	} else if (param === 'Price (Low to High)') {
		let sortedItems = items.sort((a, b) => {
			return (
				a.node.variants.edges[0].node.price -
				b.node.variants.edges[0].node.price
			);
		});

		return sortedItems;
	} else if (param === 'Price (High to Low)') {
		let sortedItems = items.sort((a, b) => {
			return (
				b.node.variants.edges[0].node.price -
				a.node.variants.edges[0].node.price
			);
		});
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
	console.log('Param: ', param);
	const items = initialItems;
	const selectedCategory = categories.filter((cat) => {
		console.log(cat.name);
		return cat.name.includes(param);
	});
	console.log(selectedCategory);
	const filteredItems = items.filter((item) => {
		return item.itemData.categoryId === selectedCategory[0].id;
	});

	return filteredItems;
};
