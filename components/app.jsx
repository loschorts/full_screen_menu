import React from 'react';

import { parseDate, parseParams } from '../util/date';
import { getGames } from '../util/api';
import onPress from '../util/on_press';
import '../util/array';

import Menu from './menu';
import NotFoundError from './not_found_error';
import DateSelector from './date_selector';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			date: parseParams() || new Date(),
			games: [],
			selected: ["Menu", "DateSelector"],
			hasContent: true
		}
	}
	assumeControls(){
		onPress("ArrowUp", this.rotateActive.bind(this, 1));
		onPress("ArrowDown", this.rotateActive.bind(this, -1));
	}
	releaseControls(){
		onPress("ArrowUp", undefined);
		onPress("ArrowDown", undefined);
	}
	componentDidMount() {
		this.getData();
		this.assumeControls();
	}
	getData(date = this.state.date) {
		getGames(...parseDate(date)).then(games => {
			const hasContent = (games.length > 0);
			const selected = hasContent ? this.state.selected : ["DateSelector", "Menu"]
			this.setState({games, date, hasContent, selected}, ()=>{
				this.state.hasContent ? this.assumeControls() : this.releaseControls();
			});
		});

	}
	rotateActive(dir){
		this.setState({ selected: this.state.selected.rotate(dir) })
	}
	render() {
		const {date, games, selected, hasContent} = this.state;

		let content;
		if (hasContent) {
			content = <Menu data={games} selected={selected[0] === "Menu"}/>
		} else {
			content =  <NotFoundError date={date}/>
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