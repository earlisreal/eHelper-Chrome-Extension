console.log("Hi from eHelper v0.8!");
chrome.runtime.onMessage.addListener(parseTests);

// Set Global Variables
var title;
var tests;

async function parseTests(request, sender, sendResponse) {
	if (sender.tab) {
        return;
	}

	console.log("Parsing Test Cases: " + request);

	title = "";
	tests = "";

	// Call the parser by platform name
	await window[request]();

	title = title.replace(/[∴*?:\/<>|"]/g, '').trim();

	var res = { 
        platform: request,
        title: title.trim(),
        tests: tests
    };

	console.log(res);
	chrome.runtime.sendMessage(res);
}
