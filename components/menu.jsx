import React from 'react';
import Thumbnail from './thumbnail';
import onPress from '../util/on_press';
import '../util/array';

import GameModal from './game_modal';

export default class Menu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			modalOpen: false,
			current: 0,
		}
	}

	assumeControls(){
		onPress("ArrowRight", this.rotate.bind(this, -1));
		onPress("ArrowLeft", this.rotate.bind(this, 1));
		onPress(" ", this.select.bind(this));
		onPress("Enter", this.select.bind(this));
	}
	
	componentDidMount(){
		if (this.props.selected) this.assumeControls();
	}

	componentDidUpdate(){
		if (this.props.selected) this.assumeControls();
	}

	componentWillReceiveProps(newProps){
		// ensures cursor presence when navigating to a new day with fewer games
		if (this.state.current >= newProps.data.length){
			this.setState({current: 0});
		}
	}

	select(){
		this.setState({modalOpen: !this.state.modalOpen});
	}

	rotate(dir) {
		let {current} = this.state;
		const {data} = this.props;
		current += dir;
		if (current < 0) current = data.length - 1;
		if (current >= data.length) current = 0;
		this.setState({ current });
	}

	thumbnails(){
		const {data, selected} = this.props;
		const {current} = this.state;

		const thumbs = data.map( (g, i) => {
			const description = `
			${g.homeCity} (${g.homeRecord}) hosts ${g.awayCity} (${g.awayRecord}) 
			at ${g.venue} (${g.time}).`
			return (
				<Thumbnail 
					src={g.thumbnail}
					header={`${g.homeName} vs. ${g.awayName}`}
					subhead={description}
					current={ i === current }
					cursor={ i === current && selected }
					key={`thumbnail-${i}`}/>
				);
		})

		// #offset style is used to re-center unbalanced carousels
		const offset = thumbs.length % 2 == 0 ? "offset" : "";

		return (
			<div id="carousel" className={`center ${offset}`}>
				{thumbs.rotate(current - parseInt(thumbs.length/2))}
			</div>
		);
	}
	render() {
		const {data, selected} = this.props;
		const {current} = this.state;
		const selectedClass = selected ? "selected" : ""

		let modalBody;
		if (data.length > 0) {
			const game = data[current].broadcast;
			modalBody = (
				<div className="broadcast-info">
					<h2>Home</h2>
					<p>Radio: {game.home.radio}</p>
					<p>TV: {game.home.tv}</p>

					<h2>Away</h2>
					<p>Radio: {game.away.radio}</p>
					<p>TV: {game.away.tv}</p>
				</div>
			)
		} else {
			modalBody = "";
		}

		return (
			<div className={`media-menu menu center ${selectedClass}`}>
			{this.thumbnails()}
			<GameModal 
				open={this.state.modalOpen}
				header="Broadcast Options"
				body={modalBody}
				/>
			</div>
		);	
	}
}
