const Bloc = ({ props }) => {
	const { isStart, isEnd, rowIndex, colIndex } = props;
	const meClasse = isStart ? 'start' : isEnd ? 'end' : '';
	return (
		<div className={`bloc ${meClasse}`} id={`bloc-${rowIndex}-${colIndex}`}>
			{`${rowIndex}-${colIndex}`}
		</div>
	);
};

export default Bloc;
