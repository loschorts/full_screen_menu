// This could be better by handling errors, especially where the date given is
// valid but not supported by the API, ex. 01, 01, 1911.

export const getGames = (mm,dd,yyyy) => new Promise(resolve => {
	fetch(url(mm,dd,yyyy))
	.then(r => r.json())
	.then(json => {
		const games = json.data.games.game;
		if (games) {
			const data = games.map((g,i) => {
				return {
					homeTeamName: g.home_team_name,
					awayTeamName: g.away_team_name,
					thumbnail: g.video_thumbnails.thumbnail.filter( t => t.scenario === "7")[0].content,
				};
			});
			resolve(data);
		} else {
			reject("invalid data returned from API");
		}
	})
	.catch(e => resolve([]))
});

const url = (mm,dd,yyyy) => (
 `http://gdx.mlb.com/components/game/mlb/year_` + 
 `${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
);