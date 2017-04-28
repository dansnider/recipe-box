var React = require('react');
var ReactDOM = require('react-dom');

class PopUp extends React.Component {
	render() {
		return (
			<div className="card">
				{JSON.stringify(this.props.data)}
			</div>
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