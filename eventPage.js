chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log("Received message on eventPage");
	console.log(message);
	console.log(sender);
	console.log(sendResponse);
});

chrome.browserAction.onClicked.addListener(sendMessage);

function sendMessage(tab){
	console.log("Sending Message from eventPage");
	chrome.tabs.sendMessage(tab.id, 'earl is real');
}