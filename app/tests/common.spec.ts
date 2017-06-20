// Required to avoid follwoing error
// this.error: reflect-metadata shim is required when using class decorators
var reflect = require("reflect-metadata")

// Required for typescript to understand Jasmine functions
// Not required if you are writing Javascript
declare var beforeEach: any;
declare var describe: any;
declare var expect: any;
declare var it: any;
