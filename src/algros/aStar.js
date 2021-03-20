const aStar = (startBloc, endBloc) => {
	let openBlocs = [];
	let closeBlocs = [];
	let path = [];

	openBlocs.push(startBloc);

	while (openBlocs.length > 0) {
		let leastIndex = 0;

		for (let i = 0; i < openBlocs.length; i++) {
			if (openBlocs[i].b < openBlocs[leastIndex].b) {
				leastIndex = i;
			}
		}

		let current = openBlocs[leastIndex];

        if (current === endBloc) {
					let tmp = current;
					path.push(tmp);
					while (tmp.previous) {
						path.push(tmp.previous);
						tmp = tmp.previous;
					}
					return path;
				}

		openBlocs = openBlocs.filter((item) => item !== current);
		closeBlocs.push(current);

		let neighbours = current.nextTo;

		for (let i = 0; i < neighbours.length; i++) {
			let neighbour = neighbours[i];

			if (!closeBlocs.includes(neighbour)) {
				let tempA = current.a + 1;
				let newPath = false;

				if (openBlocs.includes(neighbour)) {
					if (tempA < neighbour.a) {
						neighbour.a = tempA;
						newPath = true;
					}
				} else {
					neighbour.a = tempA;
					newPath = true;
					openBlocs.push(neighbour);
				}

				if (newPath) {
					neighbour.c = heruistic(neighbour, endBloc);
					neighbour.b = neighbour.c + neighbour.a;
					neighbour.previous = current;
				}
			}
		}
	}
};

const heruistic = (a, b) => {
	let c = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
	return c;
};

export default aStar;
