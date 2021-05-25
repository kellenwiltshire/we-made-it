import { vendors } from '../VendorList/VendorList';

export const checkForVendorSales = () => {
	const currentSales = vendors.filter((sale) => {
		if (sale.sale) {
			return sale;
		} else {
			return;
		}
	});
	return currentSales;
};

export const checkProductDiscounts = (results, vendorSales) => {
	results.filter((item) => {
		if (item.itemData.description) {
			for (let i = 0; i < vendorSales.length; i++) {
				const lowerCaseVendor = vendorSales[i].vendor.toLowerCase();
				const lowerCaseItem = item.itemData.description.toLowerCase();
				if (lowerCaseItem.includes(lowerCaseVendor)) {
					item.sale = vendorSales[i].sale;
				}
			}
		}
	});
};

export const checkItemDiscount = (data, vendorSales, setIsSale) => {
	if (data.itemDescription) {
		for (let i = 0; i < vendorSales.length; i++) {
			const lowerCaseVendor = vendorSales[i].vendor.toLowerCase();
			const lowerCaseItem = data.itemDescription.toLowerCase();
			if (lowerCaseItem.includes(lowerCaseVendor)) {
				data.sale = vendorSales[i].sale;
				setIsSale(true);
			}
		}
	}
};

export const checkForDiscounts = () => {
	const currentSales = [];
	vendors.filter((sale) => {
		if (sale.sale) {
			let discounts = {
				uid: sale.uid,
				catalogObjectId: sale.discount,
				scope: 'LINE_ITEM',
			};
			let doesExist = false;
			if (currentSales.length) {
				for (let i = 0; i < currentSales.length; i++) {
					if (currentSales[i].catalogObjectId === discounts.catalogObjectId) {
						doesExist = true;
					}
				}
				if (!doesExist) {
					currentSales.push(discounts);
				}
			} else {
				currentSales.push(discounts);
			}
		} else {
			return;
		}
	});
	return currentSales;
};

export const checkCartDiscounts = (cart, vendorSales, setIsDiscount) => {
	const newCart = cart.filter((item) => {
		if (item.description) {
			for (let i = 0; i < vendorSales.length; i++) {
				const lowerCaseVendor = vendorSales[i].vendor.toLowerCase();
				const lowerCaseItem = item.description.toLowerCase();
				if (lowerCaseItem.includes(lowerCaseVendor)) {
					item.discountUid = vendorSales[i].uid;
					item.sale = vendorSales[i].sale;
					item.saleObject = vendorSales[i].discount;
					setIsDiscount(true);
				}
			}
		}
	});
	return newCart;
};
