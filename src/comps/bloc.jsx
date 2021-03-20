const Bloc = ({ props }) => {
	const {
		isStart,
		isEnd,
		rowIndex,
		colIndex,
		isInPath,
		changeTarget,
		wall,
	} = props;
    const meClasse = isStart ? 'start' : isEnd ? 'end' : '';
    const inPath = isInPath ? 'inPath' : '';
    const isWall = wall ? 'isWall' : '';
	return (
		<div
			onMouseUp={() => {
				changeTarget(rowIndex, colIndex);
			}}
			className={`bloc ${meClasse} ${inPath} ${isWall}`}
			id={`bloc-${rowIndex}-${colIndex}`}
		>
			<p className='xyp'>{`${rowIndex}, ${colIndex}`}</p>
		</div>
	);
};

export default Bloc;
