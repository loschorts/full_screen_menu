const ensureDigits = i => (i < 10 ? "0".concat(i.toString()) : i.toString());

export const parseDate = date => ([
	ensureDigits(date.getMonth() + 1), // +1 b/c of indexing mismatch b/tw API and Date class
	ensureDigits(date.getDate()),
	date.getFullYear().toString()
]);

export const parseParams = () => {
	const dateParam = new URLSearchParams(window.location.search).get('date');
	if (!dateParam) return;
	const date = new Date(dateParam);
	// getDate() will return NaN for invalid dates
	return date.getDate() ? date : undefined;
};

export const shiftDate = (date, days) => {
	const dup = new Date(date.getTime())
	dup.setDate(date.getDate() + days)
	return dup;
}