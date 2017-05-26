"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
/**
 * Returns true if the given string begins with a left curly brace and ends with a right curly brace, e.g.
 * "{asdas d}" will return true, "asdasd}" will return false.
 *
 * this function does not validate the correctness of the string content other than the first and last character
 * @param str
 * @returns boolean
 */
var isJsonLikeString = function (str) {
    // [\s\S] allows the string to contain new lines
    return str && typeof str === 'string' && (str.trim().match(/^{[\s\S]*?}$/) !== null);
};
exports.isJsonLikeString = isJsonLikeString;
var isNamedNodeMap = function (obj) {
    return obj && (obj.constructor.name === 'NamedNodeMap' || obj instanceof NamedNodeMap);
};
exports.isNamedNodeMap = isNamedNodeMap;
var namedNodeMapToObject = function (source) {
    var target = {};
    Object.keys(source).forEach(function (index) {
        var name = source[index].name;
        var value = source[index].value;
        target[name] = value;
    });
    return target;
};
exports.namedNodeMapToObject = namedNodeMapToObject;
var transformKeyNamesFromKebabToSnakeCase = function (obj) {
    var _obj = obj;
    if (isJsonLikeString(obj)) {
        // Given attribute value is in the form of a JSON object -
        // Transforms the string into an object, as the Javascript API expects
        _obj = JSON.parse(obj);
    }
    else if (isNamedNodeMap(obj)) {
        _obj = namedNodeMapToObject(obj);
    }
    if (Array.isArray(_obj)) {
        // Transform all the array values (e.g. transformation array)
        _obj = _obj.map(function (currentValue) {
            return transformKeyNamesFromKebabToSnakeCase(currentValue);
        });
    }
    else if (typeof _obj === 'object') {
        Object.keys(_obj).forEach(function (key) {
            // Replace the key name with the snake_case
            var kebabKey = key.replace(/-/g, '_').toLocaleLowerCase();
            var kebabValue = transformKeyNamesFromKebabToSnakeCase(_obj[key]);
            delete _obj[key];
            _obj[kebabKey] = kebabValue;
        });
    }
    return _obj;
};
exports.transformKeyNamesFromKebabToSnakeCase = transformKeyNamesFromKebabToSnakeCase;
var Cloudinary = (function () {
    function Cloudinary(cloudinaryJsLib, configuration) {
        // Cloudinary JS already clones the given configuration so no need to clone it here too
        if (cloudinaryJsLib.CloudinaryJQuery) {
            this._cloudinaryInstance = new cloudinaryJsLib.CloudinaryJQuery(configuration);
        }
        else {
            this._cloudinaryInstance = new cloudinaryJsLib.Cloudinary(configuration);
        }
    }
    Object.defineProperty(Cloudinary.prototype, "cloudinaryInstance", {
        get: function () {
            return this._cloudinaryInstance;
        },
        enumerable: true,
        configurable: true
    });
    Cloudinary.prototype.config = function () {
        return this._cloudinaryInstance.config();
    };
    Cloudinary.prototype.url = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        return (_a = this._cloudinaryInstance).url.apply(_a, parameters);
        var _a;
    };
    Cloudinary.prototype.imageTag = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        return (_a = this._cloudinaryInstance).imageTag.apply(_a, parameters);
        var _a;
    };
    Cloudinary.prototype.videoTag = function () {
        var parameters = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parameters[_i] = arguments[_i];
        }
        return (_a = this._cloudinaryInstance).videoTag.apply(_a, parameters);
        var _a;
    };
    Cloudinary.prototype.responsive = function (img, options) {
        // Cloudinary underlying JS library will handle responsive behavior
        this._cloudinaryInstance.cloudinary_update(img, options);
        this._cloudinaryInstance.responsive(options, false);
    };
    /**
     * Transforms a set of attributes and chained transformations to an options object that can be consumed by Cloudinary JS API
     * @param attributes HTML element attributes
     * @param childTransformations QueryList with the element's <cl-transformation> children for chained transformations
     * @param cloudinary Cloudinary service
     * @returns An options object that can be consumed by Cloudinary JS API
     */
    Cloudinary.prototype.toCloudinaryAttributes = function (attributes, childTransformations) {
        var _this = this;
        var options = transformKeyNamesFromKebabToSnakeCase(attributes);
        // Add chained transformations
        if (childTransformations && childTransformations.length > 0) {
            options.transformation = [];
            // Support chained transformations
            childTransformations.forEach(function (transformation) {
                options.transformation.push(_this.toCloudinaryAttributes(transformation.getAttributes()));
            });
        }
        // Add responsiveness
        if (options.responsive === '' || options.responsive === 'true' || options.responsive === true) {
            options.responsive = true;
        }
        return options;
    };
    ;
    return Cloudinary;
}());
Cloudinary = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [Object, Object])
], Cloudinary);
exports.Cloudinary = Cloudinary;
/* Return a provider object that creates our configurable service */
function provideCloudinary(cloudinaryJsLib, configuration) {
    return { provide: Cloudinary, useFactory: function () { return new Cloudinary(cloudinaryJsLib, configuration); } };
}
exports.provideCloudinary = provideCloudinary;
;
//# sourceMappingURL=cloudinary.service.js.map