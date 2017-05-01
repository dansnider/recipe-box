
function getActiveTab(document) {
    let pageData = {};

    pageData.docType = document.head.querySelector("meta[property='og:type']").content || "";
    pageData.title = document.head.querySelector("meta[property='og:title']").content || document.head.querySelector('title').innerText;
    pageData.description = document.head.querySelector("meta[property='og:description']").content || "";
    pageData.url = window.location.href;
    pageData.image = getMainImageUrl(document);

    return pageData;
}

function getMainImageUrl(document) {
	const img = document.querySelectorAll('img');
	const twitterImage = document.head.querySelector("meta[name='twitter:image']"); 
	const ogImage = document.head.querySelector("meta[property='og:image]");
	let images = [];

	// social images are good results
	if (twitterImage) {
		return twitterImage.content;
	} else if (ogImage) {
		return ogImage.content;
	}

	// return src of largest image
	if (img.length) {
		
		img.forEach(image => {
			image.area = image.width * image.height;

			if (image.area > 16 * 16) {
				images.push(image);
			} 
		});

		images.sort(function(a, b) {
			return b.area - a.area;
		});
		
		return images[0].src;
	} else {
		return "";
	}

}

chrome.runtime.sendMessage({
    action: "getActiveTab",
    source: getActiveTab(document)
});