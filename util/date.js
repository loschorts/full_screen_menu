const ensureDigits = i => (i < 10 ? "0".concat(i.toString()) : i.toString());

export const parseDate = date => ([
	ensureDigits(date.getMonth() + 1),
	ensureDigits(date.getDate()),
	date.getFullYear().toString()
]);

export const parseParams = () => {
	const params = new URLSearchParams(window.location.search).get('date');
	if (!params) return undefined;
	const date = new Date(params);
	return date.getDate() ? date : undefined;
};

export const shiftDate = (date, days) => {
	const dup = new Date(date.getTime())
	dup.setDate(date.getDate() + days)
	return dup;
}