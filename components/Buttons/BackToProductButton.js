import Link from 'next/link';
import { useRouter } from 'next/router';

function BackToProductButton() {
	const router = useRouter();
	return (
		<button
			onClick={() => router.back()}
			aria-label='back-to-products'
			className='border border-purple-400 text-purple-400 text-lg font-title font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-lighter rounded-sm hover:bg-purple-400 hover:text-white'
		>
			Back To All Products
		</button>
	);
}

export default BackToProductButton;
