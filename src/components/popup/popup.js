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
		storeRecipe(this.props.data);
	}

	render() {
		const recipe = this.props.data;

		return (
			<div className="pop-up">
				<div className="pop-up__header">
					<SaveButton 
						clickHandler={this.state.modalDisplayed ? this.saveRecipe : this.toggleModal}
						text={this.state.modalDisplayed ? 'Go For It!' : 'Save Current Tab'}
					/>
				</div>
				<div className="pop-up__body">
					
				</div>
				<Modal isDisplayed={this.state.modalDisplayed} recipe={recipe}/>
			</div>
		);
	}
}

export default PopUp;