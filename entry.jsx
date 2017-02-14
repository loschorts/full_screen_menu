import React from 'react';
import { render } from 'react-dom';

const Root = () => {
	return (
		<div>
			React
		</div>
	);
}

document.addEventListener("DOMContentLoaded", ()=>{
	render(<Root/>, document.querySelector("#root"));
});