// fetches API data and packages it for consumption by the front-end bundle

export const getGames = (mm,dd,yyyy) => {
	return fetch(url(mm,dd,yyyy))
	.then(r => r.json())
	.then(json => {
		let games = json.data.games.game;
		console.log(games)
		if (!games) return [];
		if (!(games.constructor === Array)) games = [games]
		return games.map(game => formatGame(game))
	})
}

// helper methods

const formatGame = game => ({
	homeName: ensureString(game.home_team_name),
	awayName: ensureString(game.away_team_name),
	homeRecord: `${ensureString(game.home_win)}-${ensureString(game.home_loss)}`,
	awayRecord: `${ensureString(game.away_win)}-${ensureString(game.away_loss)}`,
	homeCity: ensureString(game.home_team_city),
	awayCity: ensureString(game.away_team_city),
	time: `${ensureString(game.time)} ${ensureString(game.time_zone)}`,
	venue: ensureString(game.venue),
	thumbnail: ensureString(getThumbnail(game)),
	broadcast: getBroadcast(game.broadcast)
})

const missing = undefined;

const getThumbnail = game => {
	try {
		return game.video_thumbnails.thumbnail.filter( t => t.scenario === "7")[0].content;

	}
	catch (e) {
		console.error(`No thumbnail provided for game with id: ${game.id}.`);
		return missing;
	}
}

const getBroadcast = broadcast => ({
	home: {
		tv: ensureString(broadcast.home.tv),
		radio: ensureString(broadcast.home.radio)
	},
	away: {
		tv: ensureString(broadcast.away.tv),
		radio: ensureString(broadcast.away.radio)
	}
})

const ensureString = object => (
	(object && object.constructor === String) ? object : ""
)

const url = (mm,dd,yyyy) => (
 `http://gdx.mlb.com/components/game/mlb/year_` + 
 `${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
);