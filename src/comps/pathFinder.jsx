import { useEffect, useState } from 'react';
import aStar from '../algros/aStar';
import Bloc from './bloc';

const initialCols = 20;
const initialRows = 12;
let startBlocRow, startBlocCol, endBlocRow, endBlocCol;
startBlocRow = startBlocCol = 0;
endBlocCol = initialCols - 1;
endBlocRow = initialRows - 1;
    
const PathFinder = () => {
	const [grid, setgrid] = useState([]);
	const [path, setpath] = useState([]);
	const [endBloc, setendBloc] = useState(null);
	const [cantFindPath, setCantFindPath] = useState(false);

	useEffect(() => {
		generateGrid();
	}, []);

	const generateGrid = () => {
		const myGrid = new Array(initialRows)
			.fill(null)
			.map((item) => new Array(initialCols).fill(null));

		for (let i = 0; i < initialRows; i++) {
			for (let j = 0; j < initialCols; j++) {
				myGrid[i][j] = new renderBloc(i, j);
			}
		}

		setgrid(myGrid);
		addNextToBlocs(myGrid);
	};

	useEffect(() => {
		if (endBloc) {
			const startBloc = grid[startBlocRow][startBlocCol];
			startBloc.wall = false;
			let tmpPath = aStar(startBloc, endBloc);
			if (tmpPath) {
				setpath(tmpPath);
				setCantFindPath(false);
			} else {
				setCantFindPath(true);
			}
		}
	}, [endBloc]);

	const cleanPaths = () => {
		let tmp = [...grid];
		for (let i = 0; i < initialRows; i++) {
			for (let j = 0; j < initialCols; j++) {
				tmp[i][j].isInPath = false;
			}
		}
		setgrid(tmp);
	};
	const changeTarget = (x, y) => {
		cleanPaths();
		if (!grid[x][y].wall) setendBloc(grid[x][y]);
	};

	useEffect(() => {
		if (path) {
			for (let i = 0; i < path.length; i++) {
				let tmp = [...grid];
				tmp[path[i].x][path[i].y].isInPath = true;
				setgrid(tmp);
			}
		}
	}, [path]);

	function renderBloc(i, j) {
		this.isInPath = false;
		this.x = i;
		this.y = j;
		this.isStart = this.x === startBlocRow && this.y === startBlocCol;
		this.isEnd = this.x === endBlocRow && this.y === endBlocCol;
		this.a = 0;
		this.b = 0;
		this.c = 0;
		this.nextTo = [];
		this.previous = null;
		this.wall = false;
		if (Math.random(1) < 0.2) {
			this.wall = true;
		}
		this.addNextTo = function (grid) {
			let i = this.x;
			let j = this.y;
			if (i > 0) this.nextTo.push(grid[i - 1][j]);
			if (i < initialRows - 1) this.nextTo.push(grid[i + 1][j]);
			if (j > 0) this.nextTo.push(grid[i][j - 1]);
			if (j < initialCols - 1) this.nextTo.push(grid[i][j + 1]);
		};
	}

	const addNextToBlocs = (grid) => {
		for (let i = 0; i < initialRows; i++) {
			for (let j = 0; j < initialCols; j++) {
				grid[i][j].addNextTo(grid);
			}
		}
	};

	const renderBlocs = (
		<div>
			{grid.map((row, rowIndex) => {
				return (
					<div key={rowIndex} className='blocRow'>
						{row.map((col, colIndex) => {
							const { isStart, isEnd, isInPath, wall } = col;
							return (
								<Bloc
									key={colIndex}
									props={{
										isEnd,
										isStart,
										rowIndex,
										colIndex,
										isInPath,
										wall,
										changeTarget,
									}}
								></Bloc>
							);
						})}
					</div>
				);
			})}
		</div>
	);
	return (
		<div className='pContainer'>
			<h1>Path finding visualizer</h1>
			<h2>Click on the  target</h2>
			<div className='board'>{renderBlocs}</div>
			{cantFindPath && <h2 className='noPath'>Can't Find a Path</h2>}
			{!cantFindPath && path && (
				<div>
					<h2>Path :</h2>
					<p>
						{path

							.map((item) => `[${item.x}, ${item.y}]`)

							.reverse()

							.join(', ')}
					</p>
				</div>
			)}
		</div>
	);
};

export default PathFinder;
