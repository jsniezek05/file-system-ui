let list = [
	"aurelia-binding",
	"aurelia-bootstrapper",
	"aurelia-dependency-injection",
	"aurelia-event-aggregator",
	"aurelia-framework",
	"aurelia-history",
	"aurelia-history-browser",
	"aurelia-http-client",
	"aurelia-loader",
	"aurelia-loader-default",
	"aurelia-logging",
	"aurelia-logging-console",
	"aurelia-metadata",
	"aurelia-pal",
	"aurelia-pal-browser",
	"aurelia-path",
	"aurelia-polyfills",
	"aurelia-route-recognizer",
	"aurelia-router",
	"aurelia-task-queue",
	"aurelia-templating",
	"aurelia-templating-binding",
	"aurelia-templating-resources",
	"aurelia-testing",
	"aurelia-templating-router",
];

let modules = list.join(' ');
modules += ' --save-dev';

let command = 'npm install ' + modules;

const exec = require('child_process').exec;
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
