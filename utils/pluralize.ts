export const pluralize = (count: number, { one, two, many} : { one: string, two: string, many: string }) => {
	let num = Math.abs(count) % 100;

	if (num >= 5 && num <= 20) {
		return many;
	}

	num %= 10;
	if (num === 1) {
		return one;
	}

	if (num >= 2 && num <= 4) {
		return two;
	}

	return many;
};
