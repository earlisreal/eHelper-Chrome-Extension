chrome.runtime.onMessage.addListener(log);

function log(request, sender, sendResponse) {
	alert("hi I'm Earl");
	console.log("Message received from content script");
	console.log(request);
	console.log(sender);
	console.log(sendResponse);
	// chrome.runtime.sendMessage(request + '\n' + document.body.innerHTML);
}

console.log("Content Script logged");