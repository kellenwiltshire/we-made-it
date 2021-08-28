import CartTable from '../../components/Checkout/CartTables';
import { useCartContext } from '../../context/Store';

function CartPage({ setNavStyle, vendorSales }) {
	const cart = useCartContext();
	setNavStyle('products');

	return (
		<div className='container mx-auto mb-20 min-h-screen'>
			{/* <SEO title={pageTitle} />
			<PageTitle text='Your Cart' /> */}
			<CartTable cart={cart} vendorSales={vendorSales} />
			<div className='max-w-sm mx-auto space-y-4 px-2 flex justify-center'>
				<button
					// onClick={handleCheckout}
					className='mx-1 px-5 py-5 m-5 bg-purple-200 text-gray-700 hover:bg-purple-700 hover:text-gray-200 rounded-lg cursor-pointer h-auto font-title'
				>
					Continue to Checkout
				</button>
			</div>
		</div>
	);
}

export default CartPage;
