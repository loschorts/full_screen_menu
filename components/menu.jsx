import React from 'react';
import Thumbnail from './thumbnail';
import onPress from '../util/on_press';
import '../util/array';

export default class Menu extends React.Component {
	constructor(){
		super();
		this.state = {
			active: 0,
		}
		onPress("ArrowRight", this.rotate.bind(this, -1));
		onPress("ArrowLeft", this.rotate.bind(this, 1));
		onPress(" ", this.openActive.bind(this));
		onPress("Enter", this.openActive.bind(this));
	}

	openActive(){
		alert(this.props.data[this.state.active].away_team_name)
	}

	rotate(i) {
		let {active} = this.state;
		const {data} = this.props;
		active += i;
		if (active < 0) active = data.length - 1;
		if (active >= data.length) active = 0;
		this.setState({ active });
	}

	thumbnails(){
		const {data} = this.props;
		const {active} = this.state;

		const thumbs = data.map( (g, i) => {
			return (
				<Thumbnail 
					src={g.video_thumbnails.thumbnail[0].content}
					header={`${g.away_team_name} vs. ${g.home_team_name}`}
					subhead={'blah blah blah'}
					active={ i === active }
					key={`thumbnail-${i}`}/>
				);
		})
		return thumbs.rotate(active - parseInt(thumbs.length/2));
	}
	render() {
		console.log(this.state.active, this.props.data)
		return (
			<div className="menu center">
			{this.thumbnails()}
			</div>
		);	
	}
}

