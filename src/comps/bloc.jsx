const Bloc = ({ props }) => {
	const { isStart, isEnd, rowIndex, colIndex, isInPath } = props;
    const meClasse = isStart ? 'start' : isEnd ? 'end' : '';
    const inPath = isInPath ? 'inPath' : '';
	return (
		<div
			className={`bloc ${meClasse} ${inPath}`}
			id={`bloc-${rowIndex}-${colIndex}`}
		>
			{`${rowIndex}-${colIndex}`}
		</div>
	);
};

export default Bloc;
