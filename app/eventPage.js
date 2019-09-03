var application = 'com.earl.ehelper';

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	console.log("Received message on eventPage");
	console.log(message);
    
    chrome.runtime.sendNativeMessage(application,
      message,
      function(response) {
        console.log(response);
		  if (chrome.runtime.lastError != null) {
			  console.log(chrome.runtime.lastError);
		  }
      });
});

function log(msg) {
    console.log(msg);
}

function checkForValidUrl(tabId, changeInfo, tab) {
    if (/^https:\/\/uva[.]onlinejudge[.]org\/.+$/.test(tab.url) ||
		/^http?:\/\/(www[.])?spoj[.]com\/(.*\/)?problems\/.*$/.test(tab.url) ||
		/^https:\/\/.*[.]kattis[.]com\/(contests\/.+\/)?problems\/.*$/.test(tab.url) ||
        /^https:\/\/.*contest2?[.]yandex[.](ru|com)\/.*contest\/\d*\/problems.*$/.test(tab.url) ||
        /^https:\/\/codeforces[.](ru|com)\/(contest|problemset|gym)\/(\d*\/problem|problem\/\d*)\/.+$/.test(tab.url) ||
        /^https:\/\/(www[.])?hackerrank[.]com\/(.*\/)?challenges\/.*$/.test(tab.url) ||
        /^https:\/\/www[.]facebook[.]com\/hackercup\/problem\/\d+\/$/.test(tab.url) ||
        /^http:\/\/(www[.])?usaco[.]org\/(current\/)?index[.]php[?]page[=]viewproblem.*$/.test(tab.url) ||
        /^https:\/\/code[.]google[.]com\/codejam\/contest\/\d*\/dashboard.*$/.test(tab.url) ||
        /^http:\/\/contest[.]bayan[.]ir\/en\/contest\/.*\/problem\/[A-Z]\/$/.test(tab.url) ||
        /^https?:\/\/(www[.])?codechef[.]com\/(.*\/)?problems\/.*$/.test(tab.url) ||
        /^http?:\/\/?spojtoolkit[.]com\/(.*\/)?test\/.*$/.test(tab.url) ||
        /^https?:\/\/(www[.])?hackerearth[.]com\/(.*\/)?(algorithm|approximate)\/.*$/.test(tab.url) ||
        /^https:\/\/csacademy[.]com\/contest\/.*\/#task\/.*$/.test(tab.url) ||
        /^http:\/\/.*[.]contest[.]atcoder[.]jp\/tasks\/.*$/.test(tab.url))
    {
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
}

chrome.tabs.onUpdated.addListener(checkForValidUrl);

function parseTask(tab) {
	console.log(tab.url);
    if (/^https:\/\/.*contest2?[.]yandex[.](ru|com)\/.*contest\/\d*\/problems.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'yandex');
    } else if (/^https:\/\/codeforces[.](ru|com)\/(contest|problemset|gym)\/(\d*\/problem|problem\/\d*)\/.+$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'codeforces');
    } else if (/^https:\/\/(www[.])?hackerrank[.]com\/(.*\/)?challenges\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'hackerrank');
    } else if (/^https:\/\/www[.]facebook[.]com\/hackercup\/problem\/\d+\/$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'facebook');
    } else if (/^http:\/\/(www[.])?usaco[.]org\/(current\/)?index[.]php[?]page[=]viewproblem.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'usaco');
    } else if (/^https:\/\/code[.]google[.]com\/codejam\/contest\/\d*\/dashboard.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'gcj');
    } else if (/^http:\/\/contest[.]bayan[.]ir\/en\/contest\/.*\/problem\/[A-Z]\/$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'bayan');
    } else if (/^https:\/\/.*[.]kattis[.]com\/(contests\/.+\/)?problems\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'kattis');
    } else if (/^https?:\/\/(www[.])?codechef[.]com\/(.*\/)?problems\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'codechef');
    } else if (/^https?:\/\/(www[.])?hackerearth[.]com\/(.*\/)?(algorithm|approximate)\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'hackerearth');
    } else if (/^http:\/\/.*[.]contest[.]atcoder[.]jp\/tasks\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'atcoder');
    } else if (/^https:\/\/csacademy[.]com\/contest\/.*\/#task\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'csacademy');
    } else if (/^http?:\/\/(www[.])?spoj[.]com\/(.*\/)?problems\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'spoj');
	} else if(/^http?:\/\/?spojtoolkit[.]com\/(.*\/)?test\/.*$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'spojtoolkit');
    } else if (/^https:\/\/uva[.]onlinejudge[.]org\/.+$/.test(tab.url)) {
        chrome.tabs.sendMessage(tab.id, 'uva');
	}
}

chrome.pageAction.onClicked.addListener(parseTask);
