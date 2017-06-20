// Fix for Zone not defined for Angular TestBed
Error.stackTraceLimit = Infinity;
require('nativescript-angular/zone-js/dist/zone-nativescript');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy'); // since zone.js 0.6.15
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch'); // put here since zone.js 0.6.14
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

var platformTesting = require('@angular/platform-browser-dynamic/testing');
var coreTesting = require('@angular/core/testing');
var tnsPlatform = require('nativescript-angular/platform');

// config TestBed with TNS provider
coreTesting.TestBed.initTestEnvironment(platformTesting.BrowserDynamicTestingModule, platformTesting.platformBrowserDynamicTesting(tnsPlatform.NS_COMPILER_PROVIDERS));

// Stop the test cases from breaking for the setGlobalVar
// https://github.com/NativeScript/nativescript-angular/issues/733
var nativeScriptDomAdapter = require('nativescript-angular/dom-adapter');
nativeScriptDomAdapter.NativeScriptDomAdapter.prototype.setGlobalVar = function (_name, _value) { console.log('Please don\'t break my unit tests!') };
