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
var cloudinary_image_component_1 = require("./cloudinary-image.component");
var cloudinary_transformation_directive_1 = require("./cloudinary-transformation.directive");
describe('CloudinaryImage', function () {
    var localCloudinary = new cloudinary_service_1.Cloudinary(require('cloudinary-core'), { cloud_name: '@@fake_angular2_sdk@@' });
    beforeEach(function () {
        spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
        spyOn(localCloudinary, 'url').and.callThrough();
        spyOn(localCloudinary, 'responsive').and.callThrough();
    });
    describe('responsive images without nested transformations', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: "<cl-image responsive id=\"image1\" width=\"300\" crop=\"scale\" effect=\"blackwhite\" public-id=\"responsive_sample.jpg\"></cl-image>"
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_image_component_1.CloudinaryImage, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // all elements with an attached CloudinaryImage
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_image_component_1.CloudinaryImage));
        });
        it('creates an img element which encodes the directive attributes to the URL', function () {
            var img = des.children[0].nativeElement;
            // http://res.cloudinary.com/@@fake_angular2_sdk@@/image/upload/c_scale,e_blackwhite,w_300/responsive_sample.jpg
            expect(img.attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/c_scale,e_blackwhite,w_300\/responsive_sample.jpg/));
            expect(img.attributes.getNamedItem('data-src').value).toEqual(jasmine.stringMatching(/c_scale,e_blackwhite,w_300\/responsive_sample.jpg/));
        });
    });
    describe('responsive images with nested transformations', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: "<cl-image responsive id=\"image1\" public-id=\"responsive_sample.jpg\">\n            <cl-transformation width=\"300\" crop=\"scale\" overlay=\"text:roboto_25_bold:SDK\"></cl-transformation>\n            <cl-transformation effect=\"art:hokusai\"></cl-transformation>\n            <cl-transformation fetch-format=\"auto\"></cl-transformation>\n            </cl-image>"
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_image_component_1.CloudinaryImage, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // all elements with an attached CloudinaryImage
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_image_component_1.CloudinaryImage));
        });
        it('creates an img element which encodes the directive attributes to the URL', function () {
            var img = des.children[0].nativeElement;
            expect(img.src).toEqual(jasmine.stringMatching(/c_scale,l_text:roboto_25_bold:SDK,w_300\/e_art:hokusai\/f_auto\/responsive_sample.jpg/));
            expect(img.attributes.getNamedItem('data-src').value).toEqual(jasmine.stringMatching(/c_scale,l_text:roboto_25_bold:SDK,w_300\/e_art:hokusai\/f_auto\/responsive_sample.jpg/));
        });
    });
    describe('missing public-id', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: '<cl-image responsive id="image1"></cl-image>'
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        it('throws if the directive is missing a public-id attribute', function () {
            var fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_image_component_1.CloudinaryImage, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            expect(function () { fixture.detectChanges(); }).toThrowError(/You must set the public id of the image to load/i);
        });
    });
    describe('non-responsive images with nested transformations', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: "<cl-image id=\"image1\" public-id=\"responsive_sample.jpg\">\n            <cl-transformation width=\"300\" crop=\"scale\" overlay=\"text:roboto_35_bold:SDK\"></cl-transformation>\n            <cl-transformation effect=\"art:hokusai\"></cl-transformation>\n            <cl-transformation fetch-format=\"auto\"></cl-transformation>\n            </cl-image>"
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_image_component_1.CloudinaryImage, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // all elements with an attached CloudinaryImage
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_image_component_1.CloudinaryImage));
        });
        it('creates an img element which encodes the directive attributes to the URL', function () {
            var img = des.children[0].nativeElement;
            expect(img.src).toEqual(jasmine.stringMatching(/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/responsive_sample.jpg/));
            expect(img.attributes.getNamedItem('data-src')).toBeNull();
        });
        it('updates the underlying img dynamically by updating attributes', function (done) {
            // Couldn't get this to work with Angular's async or fakesync
            // Add another mutation observer on the node to be able to
            // verify the change
            var observer = new MutationObserver(function () {
                var img = des.children[0].nativeElement;
                expect(img.src).toEqual(jasmine.stringMatching(/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/o_50\/responsive_sample.jpg/));
                observer.disconnect();
                done();
            });
            // Observe changes to attributes or child transformations to re-render the image
            var config = { attributes: true, childList: true };
            // pass in the target node, as well as the observer options
            observer.observe(des.nativeElement, config);
            des.nativeElement.setAttribute('opacity', '50');
        });
    });
    describe('Sample code presented in README', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: "\n            <cl-image public-id=\"readme\" class=\"thumbnail inline\" angle=\"20\" format=\"jpg\">\n                <cl-transformation height=\"150\" width=\"150\" crop=\"fill\" effect=\"sepia\" radius=\"20\"></cl-transformation>\n                <cl-transformation overlay=\"text:arial_60:readme\" gravity=\"north\" y=\"20\"></cl-transformation>\n            </cl-image>\n            "
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_image_component_1.CloudinaryImage, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // Our element under test, which is attached to CloudinaryImage
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_image_component_1.CloudinaryImage));
        });
        it('creates an img element which encodes the directive attributes to the URL', function () {
            var img = des.children[0].nativeElement;
            expect(img.src).toEqual(jasmine.stringMatching(/c_fill,e_sepia,h_150,r_20,w_150\/g_north,l_text:arial_60:readme,y_20\/a_20\/readme.jpg/));
            expect(img.attributes.getNamedItem('data-src')).toBeNull();
        });
    });
});
//# sourceMappingURL=cloudinary-image.component.spec.js.map