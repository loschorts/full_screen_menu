import React from 'react';
import onPress from '../util/on_press';
import '../util/array';
import { shiftDate } from '../util/date';

class DateSelector extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: ['<<<', '>>>']
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

	select(){
		const {date, changeDate} = this.props;
		const {active} = this.state;
		if (active[0] === '<<<') {
			changeDate(shiftDate(date, -1))
		} else {
			changeDate(shiftDate(date, 1))
		}
	}
	buttonFor (text) {
		const {active} = this.state;
		const {selected} = this.props;
		const id = ((active[0] === text) && selected) ? "cursor" : "";
		return <div id={id} className="button">{text}</div>;
	}
	rotate(dir) {
		this.setState({ active: this.state.active.rotate(dir) })
	}

	render(){
		const { date, selected } = this.props;
		const { active } = this.state;
		let className = "date-selector menu";
		if (selected) className += " selected";

		return (
			<div className={className} >
				{this.buttonFor("<<<")}
				<p>{date.toString().slice(0,15)}</p>
				{this.buttonFor(">>>")}
			</div>
		);
	}
}

export default DateSelector;