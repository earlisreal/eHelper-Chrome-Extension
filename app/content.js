// TODO : Display a pop up window when the path for programs has not been set up or previous path doesn't exists

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
		// TODO: Issue when Input keyword does not exists in <pre>
		//		 it is inside <h3> then pre is next to it
		title = $('#problem-code')[0].innerText;
		console.log(title);
		$('pre:contains(Input)').each(function(key, value) {
			testCases += $(this)[0].innerText;
		});
		console.log(testCases);
	}
	else if (request == "spoj") {
		title = $('.breadcrumb li.active')[0].innerText;
		console.log(title);
		var input = $('h3:contains(ample)').next();
		if (input.length > 1) {
			testCases = "Input:\n" + input[0].innerText;
			testCases += "Output:\n" + input[1].innerText;
		}
		else {
			testCases = input[0].innerText;
		}
	}
	else if (request == "hackerearth") {
		title = $('#problem-title')[0].innerText;
		var input = $('.dark pre')[0].innerText;
		var output = $('.dark pre')[1].innerText;
		testCases = "Input:\n" + input;
		testCases += "\nOutput:\n" + output;
	}
	else if (request == "atcoder") {
		title = $('h2')[0].innerText.substring(4);
		console.log(title);
		var inputOutput = $('.div-sample-copy:visible');
		$.each(inputOutput, function(index, value) {
			if (index % 2 == 0) {
				testCases += "Input:\n";
			}
			else {
				testCases += "Output:\n";
			}
			testCases += $(this).next()[0].innerText + "\n";
		});
	}
	else if (request == "hackerrank") {
		title = $('.hr_tour-challenge-name')[0].innerText;
		$('.hackdown-content pre').each(function (index, value) {
			if (index % 2 == 0) {
				testCases += "Input:\n";
			}
			else {
				testCases += "Output:\n";
			}
			testCases += $(this)[0].innerText + "\n";
		});
	}
	else {
		return;
	}

	// TODO : Modularize each platform on different file or use switch
	// TODO : Call function using request string. When platform doesnt exists in code, just make a blank tests file
    
	console.log(testCases);

	chrome.runtime.sendMessage({ 
        platform: request,
        testCases: testCases,
        title: title
    });
}

console.log("Content Script logged");
