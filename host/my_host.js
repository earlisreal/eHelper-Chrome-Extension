#!/usr/local/bin/node

// Might be good to use an explicit path to node on the shebang line in case
// it isn't in PATH when launched by Chrome.

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
    
    var path = 'C:/Programs/' + msg.platform + '/' + msg.title;
    if (!fs.existsSync(path)) {
        fs.mkdir(path);
    }
    
    
    fs.writeFile('C:/Programs/' + msg.platform + '/' + msg.title + '/tests', msg.testCases, function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
    
    var exec = require('child_process').exec;
    exec('gvim --remote-tab "' + path + '/' + 'sol.cpp"', function callback(error, stdout, stderr){
        push(error);
        push(stdout);
        push(stderr);
    });
    
    
    // Just echo the message:
    push(msg.testCases);
    done();
}
