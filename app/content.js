console.log("Hi from eHelper v0.7!");
chrome.runtime.onMessage.addListener(parseTests);

// Set Global Variables
var title;
var tests;

pdfParserTest();

function pdfParserTest() {
	console.log("Trying to parse pdf...");
	
	console.log(pdfjsLib);
}

function parseTests(request, sender, sendResponse) {
	if (sender.tab) {
        return;
	}

	console.log("Parsing Test Cases: " + request);

	title = "";
	tests = "";

	// Call the parser by platform name
	window[request]();

	var res = { 
        platform: request,
        title: title.trim(),
        tests: tests
    };

	console.log(res);
	chrome.runtime.sendMessage(res);
}
