// fetches API data and packages it for consumption by the front-end bundle

export const getGames = (mm,dd,yyyy) => {
	return fetch(url(mm,dd,yyyy))
	.then(r => r.json())
	.then(json => {
		try {
			let games = json.data.games.game;
			if (!games) games = []; // no games received
			if (games.constructor === Object) games = [games]; // one game received
			return games.map(game => formatGame(game))
		}
		catch (e) {
			throw 'Unexpected API response received'
		}
	})
}

// helper methods

const formatGame = game => ({
	id: game.id,
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

const getBroadcast = broadcast => {
	if (!broadcast) return {home: {tv: "", radio: ""}, away: {tv: "", radio:""}}
	return {
		home: {
			tv: ensureString(broadcast.home.tv),
			radio: ensureString(broadcast.home.radio)
		},
		away: {
			tv: ensureString(broadcast.away.tv),
			radio: ensureString(broadcast.away.radio)
		}
	}
}

const ensureString = object => (
	(object && object.constructor === String) ? object : ""
)

const url = (mm,dd,yyyy) => (
 `http://gdx.mlb.com/components/game/mlb/year_` + 
 `${yyyy}/month_${mm}/day_${dd}/master_scoreboard.json`
);