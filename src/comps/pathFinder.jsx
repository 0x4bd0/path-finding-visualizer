import { useEffect, useState } from 'react';
import Bloc from './bloc';

const initialCols = 20;
const initialRows = 10;

let startBlocRow, startBlocCol, endBlocRow, endBlocCol;
startBlocRow = startBlocCol = 0;
endBlocCol = initialCols - 1;
endBlocRow = initialRows - 1;
    
const PathFinder = () => {
    const [grid, setgrid] = useState([]);
    console.log(grid);
    useEffect(() => {
			generateGrid();
    }, []);
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
	};

    function renderBloc(i, j) {
			this.x = i;
			this.y = j;
			this.isStart = this.x === startBlocRow && this.y === startBlocCol;
			this.isEnd = this.x === endBlocRow && this.y === endBlocCol;
			this.a = 0;
			this.b = 0;
			this.c = 0;
		};

    const renderBlocs = (
			<div>
				{grid.map((row, index) => {
					return (
						<div key={index} className='blocRow'>
							{row.map((col, colIndex) => (
								<Bloc key={colIndex}></Bloc>
							))}
						</div>
					);
				})}
			</div>
		);
    return (
			<div className="pContainer">
				<h1>Path finder</h1>
				<div className="board">{renderBlocs}</div>
			</div>
		);
};

export default PathFinder;
