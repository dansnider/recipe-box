
function getActiveTab(document) {
    let pageData = {};

    pageData.title = document.head.querySelector('title').innerText;
    pageData.description = document.head.querySelector("meta[property='og:description']").content || "";
    pageData.url = window.location.href;
    pageData.image = document.head.querySelector("meta[property='og:image']") || "";

    return pageData;
}

chrome.runtime.sendMessage({
    action: "getActiveTab",
    source: getActiveTab(document)
});