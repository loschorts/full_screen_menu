import React from 'react';
import { render } from 'react-dom';

import { parseDate, parseParams } from './util/date';
import { getGames } from './util/api';

import App from './components/app';
import Menu from './components/menu';

document.addEventListener("DOMContentLoaded", () => {
	const date = parseParams() || new Date();
	getGames(...parseDate(date)).then(renderApp.bind(this, date));
});

const renderApp = (date, data) => {
	const gameData = data.games.game;
	render(<App date={date} data={gameData}/>, document.querySelector("#root"));
}

