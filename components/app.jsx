import React from 'react';

import { parseDate, parseParams } from '../util/date';
import { getGames } from '../util/api';
import onPress from '../util/on_press';
import '../util/array';

import Menu from './menu';
import ErrorMessage from './error_message';
import DateSelector from './date_selector';

const STATUS = {
	fetching: "fetching",
	success: "success",
	error: "error"
}

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			date: parseParams() || new Date(),
			games: [],
			selected: ["Menu", "DateSelector"],
			status: "fetching"
		}
		this.getData = this.getData.bind(this);
	}
	setToggleable(){
		onPress("ArrowUp", this.rotateActive.bind(this, 1));
		onPress("ArrowDown", this.rotateActive.bind(this, -1));
	}
	unsetToggleable(){
		onPress("ArrowUp", undefined);
		onPress("ArrowDown", undefined);
	}
	componentDidMount() {
		this.getData();
		this.setToggleable();
	}
	getData(date = this.state.date) {
		getGames(...parseDate(date))
		.then(
			games => {

				const hasContent = (games.length > 0);
				let status, selected;

				if (hasContent) {
					status = STATUS.success;
					this.setToggleable();
					selected = this.state.selected;
				} else {
					status = STATUS.empty;
					this.unsetToggleable();
					selected = ["DateSelector", "Menu"];
				}
				this.setState({games, date, status, selected});
			},
			error => {
				console.error(error);
				this.setState({status: STATUS.error})
			}
		)


	}
	rotateActive(dir){
		this.setState({ selected: this.state.selected.rotate(dir) })
	}
	render() {
		const {date, games, selected, status} = this.state;

		let content;
		switch (status) {
			case STATUS.success:
				content = <Menu data={games} selected={selected[0] === "Menu"}/>
				break;
			case STATUS.error:
				content = (
					<ErrorMessage message={"Network Error"}/>
				);
				break;
			case STATUS.empty: 
				content = (
					<ErrorMessage 
						message={`No Games Found for ${date.toString().slice(0, 15)}.`}
					/>
				)
				break;
		}

		return (
			<div id="app">
				<DateSelector 
					date={date} 
					selected={selected[0] === "DateSelector"} 
					changeDate={this.getData.bind(this)}/>
				{content}
			</div>
		);
	}
}

export default App;