import React from 'react';
import { render } from 'react-dom';

import {onPress} from './util/on_press';

const Root = () => {
	return (
		<div>
			React
		</div>
	);
}

const logKeyPress = ({key}) => console.log(key);

document.addEventListener("DOMContentLoaded", ()=>{
	render(<Root/>, document.querySelector("#root"));
});