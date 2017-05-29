import './button.scss';

class SaveButton extends React.Component {
	render() {
		return (
			<button className="button--save" onClick={this.props.clickHandler}>Save Current Tab</button>
		);
	}
}

export default SaveButton;