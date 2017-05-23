// start out with displaying all recipes
// big button on top to add. onclick, open modal with current tab's recipe in there
// 

import './hello.scss';
var React = require('react');
var ReactDOM = require('react-dom');

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

class Modal extends React.Component {
	render() {
		return (
			<div className={'modal ' + (this.props.isDisplayed ? 'is-displayed' : '')}>
				<Card recipe={this.props.recipe} />
			</div>
		);
	}
}

class Card extends React.Component {
	goToUrl(dest) {
		chrome.tabs.create({ url: dest });
	}

	render() {
		const recipe = this.props.recipe;

		return (
			<a className="card" href="#" onClick={() => this.goToUrl(recipe.url)}>
				<div className="card__media">
					<img className="card__image" src={recipe.image} />
				</div>
				<div className="card__content">
					<h2 className="card__title">{recipe.title}</h2>
					<p className="card__description">{recipe.description}</p>
				</div>
			</a>
		);
	}
}

class SaveButton extends React.Component {
	render() {
		return (
			<button className="button--save" onClick={this.props.clickHandler}>Save Current Tab</button>
		);
	}
}

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.executeScript(null, {
        file: "getActiveTab.bundle.js"
    });
});

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getActiveTab") {
        ReactDOM.render(
        	<PopUp data={request.source} />,
        	document.getElementById('main')
        );
    }
});

function storeRecipe(data) {
	var recipe = {};
	recipe[data.url] = data;

	chrome.storage.sync.set(recipe, ()=> {
		console.log('success')
	});
}

function clearStorage() {
	chrome.storage.sync.clear();
}