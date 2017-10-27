#!/usr/local/bin/node

// Might be good to use an explicit path to node on the shebang line in case
// it isn't in PATH when launched by Chrome.

var config = require('./config.json');
var fs = require('fs');

var nativeMessage = require('../index');

var input = new nativeMessage.Input();
var transform = new nativeMessage.Transform(messageHandler);
var output = new nativeMessage.Output();

process.stdin
    .pipe(input)
    .pipe(transform)
    .pipe(output)
    .pipe(process.stdout)
;

var subscriptions = {};

var timer = setInterval(function() {
    if (subscriptions.time) {
        output.write({ time: new Date().toISOString() });
    }
}, 1000);

input.on('end', function() {
    clearInterval(timer);
});

function messageHandler(msg, push, done) {

	// TODO: Make path dynamic by prompting the user
    
    var path = config.base_path + msg.platform + '/' + msg.title;

	// TODO: Recursively make all not existing folders
    if (!fs.existsSync(path)) {
        fs.mkdir(path);
    }
    
	fs.writeFile(path + '/tests', msg.testCases, function(err) {
		if(err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	}); 

    var exec = require('child_process').exec;
    exec('gvim --remote-tab "' + path + '/' + config.program_name, function callback(error, stdout, stderr){
        //
    });
    
    
    // Just echo the message:
    push(msg.testCases);
    done();
}
