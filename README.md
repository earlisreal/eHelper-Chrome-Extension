# eHelper

Parse programming contest sample test cases for seamless integration to IDE or Text editors.

This extension is currently designed to work with [eHelper.vim](https://github.com/earlisreal/ehelper) that will feed the parsed test cases when you run your code for easy testing.

## Requirements

* Your machine should have [Python 3](https://www.python.org/downloads/) installed
* Later version of Google Chrome - as it is only tested in this browser
* And of course GVim - I only tested it on Vim 8 and only supported the GUI (GVim) application

## Install

* Install the app folder into chrome extension
* Prepare the host installation
* Install the host manifest:
```
sudo host/install_host.sh
```

On Windows (Run as Administrator):

```
host\install_host_win.bat
```

## Usage

* ~~Make sure gvim is open~~
* Go to a problem page (i.e [Codeforces - Watermelon](http://codeforces.com/problemset/problem/4/A))
* Click the eHelper icon on the top right of your browser and Thats it!

## Supported Contest Sites

* Codeforces
* UVA Online Judge
* HackerEarth
* HackerRank
* atCoder
* CodeChef
* SPOJ

