// fetches API data and packages it for consumption by the front-end bundle

export const getGames = (mm,dd,yyyy) => new Promise(resolve => {
	fetch(url(mm,dd,yyyy))
	.then(r => r.json())
	.then(json => {
		const games = json.data.games.game;
		if (games) {
			const data = games.map((g,i) => {
				return {
					homeName: g.home_team_name,
					awayName: g.away_team_name,
					homeRecord: `${g.home_win}-${g.home_loss}`,
					awayRecord: `${g.away_win}-${g.away_loss}`,
					homeCity: g.home_team_city,
					awayCity: g.away_team_city,
					time: `${g.time} ${g.time_zone}`,
					venue: g.venue,
					thumbnail: g.video_thumbnails.thumbnail.filter( t => t.scenario === "7")[0].content,
					broadcast: g.broadcast
				};
			});
			resolve(data);
		} else {
			reject("invalid data returned from API");
		}
	})
	.catch(e => resolve([])) // always return something to the component
});

const url = (mm,dd,yyyy) => (
 `http://gdx.mlb.com/components/game/mlb/year_` + 
 `${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
);