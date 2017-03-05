import React from 'react';

class Thumbnail extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			src: props.src
		}
	}
	componentDidMount(){
		// check src and disable if 404
		if (this.props.src) {
			fetch(this.props.src)
			.catch(error => {
				console.error(error)
				this.setState({src: null})
			})
		}
	}
	componentWillReceiveProps({ src }){
		this.setState({ src })
	}
	render() {
		const {header, subhead, current, cursor} = this.props;
		const {src} = this.state;
		let className = "thumbnail";
		if (current) className += " current";

		const id = cursor ? "cursor" : "";
		return (
			<div className={className}>
				{current ? <h1 id="carousel-header">{header}</h1> : null}
				<img id={id} className="thumb-img" src={src}/>
				{current ? <h2 id="carousel-footer">{subhead}</h2> : null}
			</div>
		);
	}
}

export default Thumbnail;