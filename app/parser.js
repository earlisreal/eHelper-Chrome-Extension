// -------------------------------- PARSERS -------------------------------- \\
async function uva() {
	title = $('#col3_content_wrapper > table > tbody > tr:nth-child(2) > td > h3')[0].innerText;
	console.log(title);
	var url = $('#col3_content_wrapper > table > tbody > tr:nth-child(1) > td:nth-child(2) > a:nth-child(5)').attr('href');

	var loadingTask = pdfjsLib.getDocument({url: url});
	var doc = await loadingTask.promise;
	var totalPage = doc.numPages;
	for (var p = 1; p <= totalPage; ++p) {
		var page = await doc.getPage(p);
		var textContent = await page.getTextContent();

		var items = textContent.items;
		var sample = false;
		for (var i = 0; i < items.length; ++i) {
			if (sample) {
				if (items[i].str === "Sample Output") {
					tests += "\n";
				}
				tests += items[i].str + "\n";
			}
			if (items[i].str === "Sample Input") {
				tests += items[i].str + "\n";
				sample = true;
			}
		}
	}

	console.log(tests);
}

function atcoder() {
	title = $('h2')[0].innerText.substring(4);
	console.log(title);
	var inputOutput = $('.div-sample-copy:visible');
	$.each(inputOutput, function(index, value) {
		if (index % 2 == 0) {
			tests += "Input:\n";
		}
		else {
			tests += "Output:\n";
		}
		tests += $(this).next()[0].innerText + "\n";
	});
}

function codechef() {
	// TODO: Issue when Input keyword does not exists in <pre>
	//		 it is inside <h3> then pre is next to it
	title = $('#problem-code')[0].innerText;
	console.log(title);
	$('pre:contains(Input)').each(function(key, value) {
		tests += $(this)[0].innerText;
	});
	console.log(tests);
}

function codeforces() {
	// The MOST STABLE platform so far. Consistent format of sample test cases
	var outputs = $('.sample-test .output pre');
	$('.sample-test .input pre').each(function (index, value) {
		tests += "input:\n";
		tests += $(this)[0].innerText + "\n";
		tests += "output:\n";
		tests += outputs[index].innerText + "\n";
	});
	title = $('.problem-statement>.header>.title')[0].innerText.substring(3);
}

function hackerearth() {
	title = $('#problem-title')[0].innerText;
	var input = $('.input-output pre')[0].innerText;
	var output = $('.input-output pre')[1].innerText;
	tests = "Input:\n" + input;
	tests += "\nOutput:\n" + output;

}

function hackerrank() {
	title = $('.page-label')[0].innerText;
	for (var i = 0; i < $('.challenge_sample_input_body').length; ++i) {
		tests += "Input:\n";
		tests += $('.challenge_sample_input_body')[i].innerText + "\n";
		tests += "Output:\n";
		tests += $('.challenge_sample_output_body')[i].innerText + "\n";
	}
}

function spoj() {
	//
	// Complete title of the problem
	// title = $('.breadcrumb li.active')[0].innerText;
	//

	title = getSpojProblemCode;
	var input = $('h3:contains(ample)').next();
	if (input.length > 1) {
		tests = "Input:\n" + input[0].innerText;
		tests += "Output:\n" + input[1].innerText;
	}
	else {
		tests = input[0].innerText;
	}
	tests += "\n";
}

function spojtoolkit() {
	request = "spoj";
	title = getSpojProblemCode;
	var input = $('#testInput')[0].value;
	var output = $('#testOutput')[0].value;
	tests = "Input:\n" + input + "\n\nOutput:\n" + output + "\n";
}

function getSpojProblemCode() {
	var urlTokens = location.href.split("/");
	var x = urlTokens.length - 1
	var problemCode;
	while (urlTokens[x].length < 1) {
		--x;
	}
	problemCode = urlTokens[x];

	console.log("SPOJ problem code: " + problemCode);
}
