import './card.scss';

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

export default Card;