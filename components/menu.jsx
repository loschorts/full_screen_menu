import React from 'react';
import Thumbnail from './thumbnail';
import onPress from '../util/on_press';
import '../util/array';

export default class Menu extends React.Component {
	constructor(props){
		super(props);
		this.state = {
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
		if (this.state.current >= newProps.data.length){
			this.setState({current: 0});
		}
	}

	select(){
		alert(this.props.data[this.state.current].awayTeamName)
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
		console.log(data)
		const {current} = this.state;

		const thumbs = data.map( (g, i) => {
			return (
				<Thumbnail 
					src={g.thumbnail}
					header={`${g.awayTeamName} vs. ${g.homeTeamName}`}
					subhead={'blah blah blah'}
					current={ i === current }
					cursor={ i === current && selected }
					key={`thumbnail-${i}`}/>
				);
		})
		return thumbs.rotate(current - parseInt(thumbs.length/2));
	}
	render() {
		const {selected} = this.props;
		const selectedClass = selected ? "selected" : ""
		return (
			<div className={`media-menu menu center ${selectedClass}`}>
			{this.thumbnails()}
			</div>
		);	
	}
}

