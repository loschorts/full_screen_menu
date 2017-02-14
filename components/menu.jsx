import React from 'react';
import Thumbnail from './thumbnail';
import onPress from '../util/on_press';

export default class Menu extends React.Component {
	constructor(){
		super();
		this.state = {
			active: 0,
		}
		this.onRight = this.onRight.bind(this);
		this.onLeft = this.onLeft.bind(this);
		onPress("ArrowRight", this.onRight);
		onPress("ArrowLeft", this.onLeft);
	}
	onRight(){
		if (this.state.active === this.props.data.length - 1) return;
		this.setState({active: this.state.active+1});
	}	
	onLeft(){
		if (this.state.active === 0) return;
		this.setState({active: this.state.active-1});
	}
	thumbnails(){
		const {data} = this.props;
		const {active} = this.state;
		return data.map( (g, i) => {
			return (
				<Thumbnail 
					src={g.video_thumbnails.thumbnail[0].content}
					header={`${g.away_team_name} vs. ${g.home_team_name}`}
					subhead={'blah blah blah'}
					active={ i === active }
					key={`thumbnail-${i}`}/>
				);
		});
	}
	render() {

		return (
			<div className="menu center">
			{this.thumbnails()}
			</div>
		);	
	}
}

