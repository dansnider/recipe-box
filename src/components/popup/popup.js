import SaveButton from '../button/button.js'
import Modal from '../modal/modal.js'

import './popup.scss';

class PopUp extends React.Component {
	constructor() {
		super();

		this.toggleModal = this.toggleModal.bind(this);
		this.saveRecipe = this.saveRecipe.bind(this);
		this.state = {
			modalDisplayed: false
		}
	}

	toggleModal(e) {
		e.preventDefault();
		this.setState({
			modalDisplayed: true
		})
	}

	saveRecipe(e) {
		e.preventDefault();
		debugger;
		storeRecipe(this.props.data);
	}

	render() {
		const recipe = this.props.data;

		return (
			<div className="pop-up">
				<SaveButton clickHandler={this.state.modalDisplayed ? this.saveRecipe : this.toggleModal } />
				<Modal isDisplayed={this.state.modalDisplayed} recipe={recipe}/>
			</div>
		);
	}
}

export default PopUp;