import { useEffect, useState } from 'react';
import aStar from '../algros/aStar';
import Bloc from './bloc';

const initialCols = 20;
const initialRows = 10;
let startBlocRow, startBlocCol, endBlocRow, endBlocCol;
startBlocRow = startBlocCol = 0;
endBlocCol = initialCols - 1;
endBlocRow = initialRows - 1;
    
const PathFinder = () => {
	const [grid, setgrid] = useState([]);
    const [path, setpath] = useState([]);
    const [endBloc, setendBloc] = useState(null);

    useEffect(() => {
		generateGrid();
	}, [endBloc]);

	const generateGrid = () => {
		const grid = new Array(initialRows)
			.fill(null)
			.map((item) => new Array(initialCols).fill(null));

		for (let i = 0; i < initialRows; i++) {
			for (let j = 0; j < initialCols; j++) {
				grid[i][j] = new renderBloc(i, j);
			}
		}

		setgrid(grid);
		addNextToBlocs(grid);

        const startBloc = grid[startBlocRow][startBlocCol];
        
        if (endBloc) {
            let tmpPath = aStar(startBloc, endBloc);

			setpath(tmpPath);
        }

    };
    
    const changeTarget = (x, y) => {
         setendBloc(grid[x][y]);
    }

    useEffect(() => {
        if (path) {
                    for (let i = path.length - 1; i > 0; i--) {
											let tmp = [...grid];
											setTimeout(function () {
												tmp[path[i].x][path[i].y].isInPath = true;
												setgrid(tmp);
											}, 100);
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
							const { isStart, isEnd, isInPath } = col;
							return (
								<Bloc
									key={colIndex}
									props={{
										isEnd,
										isStart,
										rowIndex,
										colIndex,
										isInPath,
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
			<h1>Path finder</h1>
			<div className='board'>{renderBlocs}</div>
		</div>
	);
};

export default PathFinder;
