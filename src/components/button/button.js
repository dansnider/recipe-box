import './button.scss';

class SaveButton extends React.Component {
	render() {
		return (
			<button className="button--save" onClick={this.props.clickHandler}>{this.props.text}</button>
		);
	}
}

export default SaveButton;