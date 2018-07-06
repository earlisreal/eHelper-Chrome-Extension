# eHelper

Parse programming contest sample test cases directly to vim.

This extension is designed to work with (eHelper.vim)[https://github.com/earlisreal/ehelper] that will feed the parsed test cases when you run your code for easy testing.

## Install

* Install the app folder into chrome extension
* Prepare the host installation
	* Edit the 'host/com.earl.ehelper-win.json' for windows or 'host/com.earl.ehelper.json' for linux
	* Get the chrome extension ID at 'chrome://extensions/ > eHelper > Details'
	* Copy the ID to 'allowed_origins' (i.e '"chrome-extension://[YOUR-APP-ID]/"')
* Install the host manifest:
```
sudo host/register.sh
```

On Windows (Run as Administrator):

```
host\register.bat
```

## Usage

* Make sure gvim is open
* Go to a problem page (i.e (Watermelon) [http://codeforces.com/problemset/problem/4/A])
* Click the eHelper icon on the top right of your browser and Thats it!
