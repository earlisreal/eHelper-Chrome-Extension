console.log("Hi from eHelper!");
chrome.runtime.onMessage.addListener(parseTests);

// Set Global Variables
var title;
var tests;

function parseTests(request, sender, sendResponse) {
	if (sender.tab) {
        return;
	}

	console.log("Parsing Test Cases: " + request);

	// try {
		title = "";
		tests = "";
		// Call the parser by platform name
		window[request]();
	// }
	// catch (error) {
	// 	// Platform (request) not supported
	// 	// TODO : Call function using request string. When platform doesnt exists or not supported, just make a blank tests file
	// 	console.error("Platform not yet supported");
	// }

	var res = { 
        platform: request,
        title: title,
        tests: tests
    };

	console.log(res);
	chrome.runtime.sendMessage(res);
}
