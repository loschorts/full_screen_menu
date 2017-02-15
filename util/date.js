const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

export const parseDate = date => ([
	months[date.getMonth()],
	date.getDate().toString(),
	date.getFullYear().toString()
]);

export const parseParams = () => {
	const params = new URLSearchParams(window.location.search).get('date');
	if (!params) return false;
	const date = new Date(params);
	return date.getDate() ? date : false;
};