var React = require('react');
var ReactDOM = require('react-dom');

import PopUp from './components/popup/popup.js'

import './css/base.scss';

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