const Bloc = ({ props }) => {
	const { isStart, isEnd, rowIndex, colIndex, isInPath, changeTarget } = props;
    const meClasse = isStart ? 'start' : isEnd ? 'end' : '';
    const inPath = isInPath ? 'inPath' : '';
	return (
		<div
			onMouseOver={() => {
				changeTarget(rowIndex, colIndex);
			}}
			className={`bloc ${meClasse} ${inPath}`}
			id={`bloc-${rowIndex}-${colIndex}`}
		>
			{`${rowIndex}-${colIndex}`}
		</div>
	);
};

export default Bloc;
