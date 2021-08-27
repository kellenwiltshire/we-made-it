export function saveLocalData(cart) {
	localStorage.setItem(
		process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME,
		JSON.stringify(cart),
	);
}

function getLocalData() {
	return JSON.parse(
		localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME),
	);
}

export function setLocalData(setCart) {
	const localData = getLocalData();
	console.log('Local Data: ', localData);

	if (localData) {
		setCart(localData);
	}
}

export function getCartSubTotal(cart) {
	if (cart.length === 0) {
		return 0;
	} else {
		let totalPrice = 0;
		cart.forEach(
			(item) =>
				(totalPrice +=
					parseInt(item.variantQuantity) * parseFloat(item.variantPrice)),
		);
		return Math.round(totalPrice * 100) / 100;
	}
}
