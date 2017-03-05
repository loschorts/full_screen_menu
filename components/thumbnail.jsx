import React from 'react';

class Thumbnail extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			src: props.src
		}
		this.checkSrc = this.checkSrc.bind(this)
	}
	componentDidMount(){
		this.checkSrc();
	}
	checkSrc(){
		// check src and disable if 404
		if (this.props.src) {
			fetch(this.props.src)
			.catch(error => {
				console.error(error)
				this.setState({src: null})
			})
		}
	}
	render() {
		const {header, subhead, current, cursor} = this.props;
		const {src} = this.state;
		let className = "thumbnail";
		if (current) className += " current";

		let thumbnail;

		const id = cursor ? "cursor" : "";

		if (src) {
			thumbnail = <img id={id} className="thumb-img" src={src}/>
		} else {
			thumbnail = <div id={id} className="thumb-img">No Thumbnail Provided.</div>
		}
		return (
			<div className={className}>
				{current ? <h1 id="carousel-header">{header}</h1> : null}
				{thumbnail}
				{current ? <h2 id="carousel-footer">{subhead}</h2> : null}
			</div>
		);
	}
}

export default Thumbnail;