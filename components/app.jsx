import React from 'react';

import Menu from './menu';
import NotFoundError from './not_found_error';
import DateSelector from './date_selector';

class App extends React.Component {
	render() {
		const {date, data} = this.props;
		if (data) {
			return (
				<div id="app">
					<DateSelector date={date}/>
					<Menu data={data}/>
				</div>
			);
		} else {
			return <NotFoundError date={date}/>;
		}
	}
}

export default App;