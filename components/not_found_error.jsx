import React from 'react';

const NotFoundError = ({date}) => (
	<p id="error">
		No Games Found for {date.toString().slice(0, 15)}.
	</p>
);

export default NotFoundError;