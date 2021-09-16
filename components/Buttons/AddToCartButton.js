function AddToCartButton({ handleAddToCart, cartStatus }) {
	return (
		<button
			onClick={handleAddToCart}
			aria-label='add-to-cart'
			className='border border-purple-400 bg-purple-400 text-white text-lg font-title font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center  focus:outline-none w-full  rounded-sm hover:bg-white hover:text-purple-400'
		>
			{cartStatus}
		</button>
	);
}

export default AddToCartButton;
