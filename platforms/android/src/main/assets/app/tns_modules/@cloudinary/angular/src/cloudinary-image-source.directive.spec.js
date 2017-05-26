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
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var cloudinary_service_1 = require("./cloudinary.service");
var cloudinary_image_source_directive_1 = require("./cloudinary-image-source.directive");
var cloudinary_transformation_directive_1 = require("./cloudinary-transformation.directive");
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        template: "\n    <a [clHref]=\"image.public_id\" fetch_format=\"auto\" target=\"_blank\">\n        <cl-transformation effect=\"sepia\"></cl-transformation>\n        click me\n    </a>\n    <img [clSrc]=\"image.public_id\" width=\"100\" crop=\"scale\"/>\n    "
    }),
    __metadata("design:paramtypes", [])
], TestComponent);
describe('CloudinaryImageSourceDirective', function () {
    var fixture;
    var des; // the three elements w/ the directive
    var localCloudinary = new cloudinary_service_1.Cloudinary(require('cloudinary-core'), { cloud_name: '@@fake_angular2_sdk@@' });
    beforeEach(function () {
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [cloudinary_image_source_directive_1.CloudinaryImageSourceDirective, cloudinary_transformation_directive_1.CloudinaryTransformationDirective, TestComponent],
            providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
        }).createComponent(TestComponent);
        var comp = fixture.componentInstance;
        // pretend that it was wired to something that supplied an image
        comp['image'] = {
            public_id: 'some_image_id'
        };
        fixture.detectChanges(); // initial binding
        // all elements with an attached CloudinaryImageSourceDirective
        des = fixture.debugElement.queryAll(platform_browser_1.By.directive(cloudinary_image_source_directive_1.CloudinaryImageSourceDirective));
    });
    it('should have 2 elements', function () {
        expect(des.length).toBe(2);
    });
    it('updates the anchor url', function () {
        var anchor = des[0].nativeElement;
        expect(anchor.href).toEqual(jasmine.stringMatching(/f_auto\/some_image_id/));
    });
    it('Can get the attributes of the first transformation', function () {
        var img = des[1].nativeElement;
        expect(img.src).toEqual(jasmine.stringMatching(/c_scale,w_100\/some_image_id/));
    });
    it('Has chained transformations', function () {
        var anchor = des[0].nativeElement;
        expect(anchor.href).toEqual(jasmine.stringMatching(/image\/upload\/e_sepia\/f_auto\/some_image_id/));
    });
});
//# sourceMappingURL=cloudinary-image-source.directive.spec.js.map