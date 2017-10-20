chrome.runtime.onMessage.addListener(parseTestCases);

function parseTestCases(request, sender, sendResponse) {
	if (sender.tab) {
        return;
	}

	console.log("parsing Test Cases");
	console.log("Request: " +request);

	var testCases = "";
    var title = "";
	if (request == "codeforces") {
		var outputs = $('.sample-test .output pre');
		$('.sample-test .input pre').each(function (index, value) {
			testCases += "input:\n";
			testCases += $(this)[0].innerText + "\n";
			testCases += "output:\n";
			testCases += outputs[index].innerText + "\n";
		});
        title = $('.problem-statement>.header>.title')[0].innerText.substring(3);
	}
	else if (request == "codechef") {
		var inputs = $('pre')[0];
		console.log(inputs);
		var outputs = $('pre')[1];
		console.log(outputs);
	}
    
	console.log(testCases);
	chrome.runtime.sendMessage({ 
        platform: request,
        testCases: testCases,
        title: title
    });
}

console.log("Content Script logged");
