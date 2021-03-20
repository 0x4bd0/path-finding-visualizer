import { useEffect, useState } from 'react';
import Bloc from './bloc';

const initialCols = 5;
const initialRows = 5;

const PathFinder = () => {
    const [grid, setgrid] = useState([]);
    useEffect(() => {
			generateGrid();
    }, []);
	const generateGrid = () => {
		const grid = new Array(initialCols)
			.fill(null)
			.map((item) => new Array(initialRows).fill(null));

		for (let i = 0; i < initialCols; i++) {
			for (let j = 0; j < initialRows; j++) {
				grid[i][j] = renderBloc(i, j);
			}
        }
        
		setgrid(grid);
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

    const renderBlocs = (
        <div>
            {
                grid.map((row, index) => {
                    console.log(index);
                    return (
											<div key={index} className='blocRow'>
												{row.map((col, colIndex) => (
													<Bloc key={colIndex}></Bloc>
												))}
											</div>
										);
                })
            }
        </div>
    )
    return (
			<div className="pContainer">
				<h1>Path finder</h1>
				<div className="board">{renderBlocs}</div>
			</div>
		);
};

export default PathFinder;
