var React = require('react');
var ReactDOM = require('react-dom');

class PopUp extends React.Component {
	goToUrl(dest) {
		chrome.tabs.create({ url: dest });
	}
	render() {
		const recipe = this.props.data;

		return (
			<a className="card" onClick={() => this.goToUrl(recipe.url)}>
				<div className="card__media">
					<img className="card__image" src={recipe.image} />
				</div>
				<h2>{recipe.title}</h2>
				<p>{recipe.description}</p>
			</a>
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