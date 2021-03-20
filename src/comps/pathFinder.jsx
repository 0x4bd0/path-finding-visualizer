import { useState } from 'react';

const initialCols = 5;
const initialRows = 5;

const PathFinder = () => {
	const [grid, setgrid] = useState([]);
	const generateGrid = () => {
		const grid = new Array(initialCols)
			.fill(null)
			.map((item) => new Array(initialRows).fill(null));

		for (let i = 0; i < initialCols; i++) {
			for (let j = 0; j < initialRows; j++) {
				grid[i][j] = renderBloc(i, j);
			}
		}
		console.log(grid);
	};

	const renderBloc = (i, j) => {
		return {
			x: i,
			y: j,
			a: 0,
			b: 0,
			c: 0,
		};
	};

	generateGrid();

	return <div>Path finder component</div>;
};

export default PathFinder;
