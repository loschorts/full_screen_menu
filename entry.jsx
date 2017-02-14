import React from 'react';
import { render } from 'react-dom';
import { getGames } from './util/api';
import Menu from './components/menu';

document.addEventListener("DOMContentLoaded", () => {
	getGames("04","20","2016").then(renderMenu);
});

const renderMenu = data => {
	render(<Menu data={ data.games.game } />, document.querySelector("#root"));
}