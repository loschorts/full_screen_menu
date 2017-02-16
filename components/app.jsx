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
	attachKeyListeners(){
		onPress("ArrowUp", this.rotateActive.bind(this, 1));
		onPress("ArrowDown", this.rotateActive.bind(this, -1));
	}
	detachKeyListeners(){
		onPress("ArrowUp", undefined);
		onPress("ArrowDown", undefined);
	}
	componentDidMount() {
		this.getData();
		this.attachKeyListeners();
	}
	getData(date = this.state.date) {
		getGames(...parseDate(date)).then(games => {
			const hasContent = (games.length > 0);
			this.setState({games, date, hasContent}, ()=>{
				this.state.hasContent ? this.attachKeyListeners() : this.detachKeyListeners();
			});
		});

	}
	rotateActive(dir){
		this.setState({ selected: this.state.selected.rotate(dir) })
	}
	render() {
		const {date, games, selected, hasContent} = this.state;
		console.log(date)
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