// This could be better by handling errors, especially where the date given is
// valid but not supported by the API, ex. 01, 01, 1911.

export const getGames = (mm,dd,yyyy) => new Promise(resolve => {
	fetch(url(mm,dd,yyyy))
	.then(r => r.json())
	.then(json => resolve(json.data));
});

const url = (mm,dd,yyyy) => (
 `http://gdx.mlb.com/components/game/mlb/year_` + 
 `${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
);