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
var CloudinaryImage = (function () {
    function CloudinaryImage(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
    }
    CloudinaryImage.prototype.ngOnInit = function () {
        var _this = this;
        // Create an observer instance
        this.observer = new MutationObserver(function () {
            _this.loadImage();
        });
        // Observe changes to attributes or child transformations to re-render the image
        var config = { attributes: true, childList: true };
        // pass in the target node, as well as the observer options
        this.observer.observe(this.el.nativeElement, config);
    };
    CloudinaryImage.prototype.ngOnDestroy = function () {
        this.observer.disconnect();
    };
    CloudinaryImage.prototype.ngAfterViewInit = function () {
        this.loadImage();
    };
    CloudinaryImage.prototype.loadImage = function () {
        if (!this.publicId) {
            throw new Error('You must set the public id of the image to load, e.g. <cl-image public-id={{photo.public_id}}...></cl-image>');
        }
        var nativeElement = this.el.nativeElement;
        var image = nativeElement.children[0];
        var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
        var imageTag = this.cloudinary.imageTag(this.publicId, options);
        this.setElementAttributes(image, imageTag.attributes());
        if (options.responsive) {
            this.cloudinary.responsive(image, options);
        }
    };
    ;
    CloudinaryImage.prototype.setElementAttributes = function (element, attributesLiteral) {
        Object.keys(attributesLiteral).forEach(function (attrName) {
            element.setAttribute(attrName, attributesLiteral[attrName]);
        });
    };
    return CloudinaryImage;
}());
__decorate([
    core_1.Input('public-id'),
    __metadata("design:type", String)
], CloudinaryImage.prototype, "publicId", void 0);
__decorate([
    core_1.ContentChildren(cloudinary_transformation_directive_1.CloudinaryTransformationDirective),
    __metadata("design:type", core_1.QueryList)
], CloudinaryImage.prototype, "transformations", void 0);
CloudinaryImage = __decorate([
    core_1.Component({
        selector: 'cl-image',
        template: '<img>'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, cloudinary_service_1.Cloudinary])
], CloudinaryImage);
exports.CloudinaryImage = CloudinaryImage;
//# sourceMappingURL=cloudinary-image.component.js.map