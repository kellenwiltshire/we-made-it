function Price({ num, numSize }) {
	return (
		<>
			$<span className={numSize}>{num}</span>
		</>
	);
}

export default Price;
