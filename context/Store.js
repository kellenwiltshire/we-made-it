import { createContext, useContext, useState, useEffect } from 'react';
import { setLocalData, saveLocalData } from '../utils/checkout';

const CartContext = createContext();
const AddToCartContext = createContext();
const UpdateCartQuantityContext = createContext();

export function useCartContext() {
	return useContext(CartContext);
}

export function useAddToCartContext() {
	return useContext(AddToCartContext);
}

export function useUpdateCartQuantityContext() {
	return useContext(UpdateCartQuantityContext);
}

export function CartProvider({ children }) {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		setLocalData(setCart);
	}, []);

	useEffect(() => {
		// do this to make sure multiple tabs are always in sync
		const onReceiveMessage = (e) => {
			console.log(e);
			setLocalData(setCart);
		};

		window.addEventListener('storage', onReceiveMessage);
		return () => {
			window.removeEventListener('storage', onReceiveMessage);
		};
	}, []);

	function addToCart(newItem) {
		// empty cart
		if (cart.length === 0) {
			setCart([...cart, newItem]);

			saveLocalData(newItem);
		} else {
			let newCart = [...cart];
			let itemAdded = false;
			// loop through all cart items to check if variant
			// already exists and update quantity
			newCart.map((item) => {
				if (item.variantId === newItem.variantId) {
					item.variantQuantity += newItem.variantQuantity;
					itemAdded = true;
				}
			});

			let newCartWithItem = [...newCart];
			if (itemAdded) {
			} else {
				// if its a new item than add it to the end
				newCartWithItem = [...newCart, newItem];
			}

			setCart(newCartWithItem);
			saveLocalData(newCartWithItem);
		}
	}

	function updateCartItemQuantity(id, quantity) {
		let newQuantity = Math.floor(quantity);
		if (quantity === '') {
			newQuantity = '';
		}
		let newCart = [...cart];
		newCart.forEach((item) => {
			if (item.variantId === id) {
				item.variantQuantity = newQuantity;
			}
		});

		// take out zeroes items
		newCart = newCart.filter((i) => i.variantQuantity !== 0);
		setCart(newCart);

		saveLocalData(newCart);
	}

	return (
		<CartContext.Provider value={cart}>
			<AddToCartContext.Provider value={addToCart}>
				<UpdateCartQuantityContext.Provider value={updateCartItemQuantity}>
					{children}
				</UpdateCartQuantityContext.Provider>
			</AddToCartContext.Provider>
		</CartContext.Provider>
	);
}
