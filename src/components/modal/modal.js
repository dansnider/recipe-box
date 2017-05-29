import Card from '../card/card.js'

import './modal.scss';

class Modal extends React.Component {
	render() {
		return (
			<div className={'modal ' + (this.props.isDisplayed ? 'is-displayed' : '')}>
				<Card recipe={this.props.recipe} />
			</div>
		);
	}
}

export default Modal;