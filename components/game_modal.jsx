import React from 'react';
import ReactDOM from 'react-dom';

const hiddenStyle = {display: "none"};
const openStyle = {display: "block"};

class GameModal extends React.Component {
	render(){
		const {open, header, body} = this.props;
		const style = open ? openStyle : hiddenStyle;
		return (
			<div id="modal" style={style}>
				<div id="modal-content" className="center">
					<h1>{header}</h1>
					{body}
				</div>
			</div>
		);
	}
}
export default GameModal;