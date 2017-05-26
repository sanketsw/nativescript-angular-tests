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
var CloudinaryVideo = (function () {
    function CloudinaryVideo(el, cloudinary) {
        this.el = el;
        this.cloudinary = cloudinary;
    }
    CloudinaryVideo.prototype.ngOnInit = function () {
        var _this = this;
        // Create an observer instance
        this.observer = new MutationObserver(function () {
            _this.loadVideo(_this.publicId);
        });
        // Observe changes to attributes or child transformations to re-render the image
        var config = { attributes: true, childList: true };
        // pass in the target node, as well as the observer options
        this.observer.observe(this.el.nativeElement, config);
    };
    CloudinaryVideo.prototype.ngOnDestroy = function () {
        this.observer.disconnect();
    };
    CloudinaryVideo.prototype.ngAfterViewInit = function () {
        if (!this.publicId) {
            throw new Error('You must set the public id of the video to load, e.g. <cl-video public-id={{video.public_id}}...></cl-video>');
        }
        this.loadVideo(this.publicId);
    };
    CloudinaryVideo.prototype.loadVideo = function (publicId) {
        var nativeElement = this.el.nativeElement;
        var video = nativeElement.children[0];
        var options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);
        var videoTag = this.cloudinary.videoTag(publicId, options);
        // Replace template with the custom video tag created by Cloudinary
        this.appendSourceElements(video, videoTag.content());
        // Add attributes
        this.setElementAttributes(video, videoTag.attributes());
    };
    ;
    CloudinaryVideo.prototype.setElementAttributes = function (element, attributesLiteral) {
        Object.keys(attributesLiteral).forEach(function (attrName) {
            element.setAttribute(attrName, attributesLiteral[attrName]);
        });
    };
    CloudinaryVideo.prototype.appendSourceElements = function (element, html) {
        var fragment = document.createDocumentFragment();
        element.innerHTML = html;
        while (element.childNodes[0]) {
            fragment.appendChild(element.childNodes[0]);
        }
        element.appendChild(fragment);
    };
    return CloudinaryVideo;
}());
__decorate([
    core_1.Input('public-id'),
    __metadata("design:type", String)
], CloudinaryVideo.prototype, "publicId", void 0);
__decorate([
    core_1.ContentChildren(cloudinary_transformation_directive_1.CloudinaryTransformationDirective),
    __metadata("design:type", core_1.QueryList)
], CloudinaryVideo.prototype, "transformations", void 0);
CloudinaryVideo = __decorate([
    core_1.Component({
        selector: 'cl-video',
        template: '<video></video>'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, cloudinary_service_1.Cloudinary])
], CloudinaryVideo);
exports.CloudinaryVideo = CloudinaryVideo;
//# sourceMappingURL=cloudinary-video.component.js.map