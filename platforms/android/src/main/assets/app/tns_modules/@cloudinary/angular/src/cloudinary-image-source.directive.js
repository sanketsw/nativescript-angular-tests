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
var cloudinary_service_1 = require("./cloudinary.service");
var cloudinary_transformation_directive_1 = require("./cloudinary-transformation.directive");
var CloudinaryImageSourceDirective = (function () {
    function CloudinaryImageSourceDirective(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
    }
    CloudinaryImageSourceDirective.prototype.ngAfterViewInit = function () {
        var attrName;
        var propertyValue;
        if (this.clHref) {
            attrName = 'href';
            propertyValue = this.clHref;
        }
        else if (this.clSrc) {
            attrName = 'src';
            propertyValue = this.clSrc;
        }
        else if (this.clSrcset) {
            attrName = 'srcset';
            propertyValue = this.clSrcset;
        }
        var isSvg = false;
        if (this.clHref &&
            toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
            this.el.nativeElement.setAttribute('xlinkHref', 'xlink:href');
            isSvg = true;
        }
        if (!attrName || !propertyValue) {
            throw new Error('Directive value is missing for clHref/clSrc/clSrcset');
        }
        var nativeElement = this.el.nativeElement;
        var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
        var attrValue = this.cloudinary.url(propertyValue, options);
        this.el.nativeElement.setAttribute(attrName, attrValue);
        /*
         on IE, if "ngSrc" directive declaration is used and "src" attribute doesn't exist
         then calling element.setAttribute('src', 'foo') doesn't do anything, so we need
         to set the property as well to achieve the desired effect.

         Check for IE: http://stackoverflow.com/a/32139375/198095
         if is IE then documentMode contains IE version
         */
        var msie = this.el.nativeElement.ownerDocument.documentMode;
        if (msie && !isSvg) {
            // IE logic here
            this.el.nativeElement[attrName] = attrValue;
        }
    };
    ;
    return CloudinaryImageSourceDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CloudinaryImageSourceDirective.prototype, "clHref", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CloudinaryImageSourceDirective.prototype, "clSrc", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CloudinaryImageSourceDirective.prototype, "clSrcset", void 0);
__decorate([
    core_1.ContentChildren(cloudinary_transformation_directive_1.CloudinaryTransformationDirective),
    __metadata("design:type", core_1.QueryList)
], CloudinaryImageSourceDirective.prototype, "transformations", void 0);
CloudinaryImageSourceDirective = __decorate([
    core_1.Directive({
        selector: '[clHref], [clSrc], [clSrcset]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, cloudinary_service_1.Cloudinary])
], CloudinaryImageSourceDirective);
exports.CloudinaryImageSourceDirective = CloudinaryImageSourceDirective;
//# sourceMappingURL=cloudinary-image-source.directive.js.map