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
var cloudinary_video_component_1 = require("./cloudinary-video.component");
var cloudinary_transformation_directive_1 = require("./cloudinary-transformation.directive");
describe('CloudinaryVideo', function () {
    var localCloudinary = new cloudinary_service_1.Cloudinary(require('cloudinary-core'), { cloud_name: '@@fake_angular2_sdk@@' });
    beforeEach(function () {
        spyOn(localCloudinary, 'toCloudinaryAttributes').and.callThrough();
        spyOn(localCloudinary, 'videoTag').and.callThrough();
    });
    describe('testing phantomjs', function () {
        it('it uses createElement to create <source> and append to <video>', function () {
            function addSourceToVideo(element, src, type) {
                var source = document.createElement('source');
                source.src = src;
                source.type = type;
                element.appendChild(source);
            }
            var video = document.createElement('video');
            document.body.appendChild(video);
            addSourceToVideo(video, 'http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv', 'video/ogg');
            expect(video.childElementCount).toBe(1);
            expect(video.children[0].src).toEqual('http://upload.wikimedia.org/wikipedia/commons/7/79/Big_Buck_Bunny_small.ogv');
        });
        it('it creates <source> elements using innerHTML', function () {
            var video = document.createElement('video');
            document.body.appendChild(video);
            var source = "<source src=\"http://res.cloudinary.com/@@fake_angular2_sdk@@/video/upload/c_scale,l_text:roboto_35_bold:SDK,w_300/e_art:hokusai/f_auto/sample_video.mp4\" type=\"video/mp4\">\n                            <source src=\"http://res.cloudinary.com/@@fake_angular2_sdk@@/video/upload/c_scale,l_text:roboto_35_bold:SDK,w_300/e_art:hokusai/f_auto/sample_video.mp4\" type=\"video/mp4\">";
            video.innerHTML = source;
            expect(video.childElementCount).toBe(2);
            expect(video.children[0].attributes.getNamedItem('src')).toBeDefined();
            expect(video.children[0].attributes.getNamedItem('src').value)
                .toEqual('http://res.cloudinary.com/@@fake_angular2_sdk@@/video/upload/c_scale,l_text:roboto_35_bold:SDK,w_300/e_art:hokusai/f_auto/sample_video.mp4');
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
                template: '<cl-video id="video1"></cl-video>'
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        it('throws if the directive is missing a public-id attribute', function () {
            var fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_video_component_1.CloudinaryVideo, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            expect(function () {
                fixture.detectChanges();
            }).toThrowError(/You must set the public id of the video to load/i);
        });
    });
    describe('videos with nested transformations', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: "<cl-video id=\"video1\" public-id=\"sample_video\">\n            <cl-transformation width=\"300\" crop=\"scale\" overlay=\"text:roboto_35_bold:SDK\"></cl-transformation>\n            <cl-transformation effect=\"art:hokusai\"></cl-transformation>\n            <cl-transformation fetch_format=\"auto\"></cl-transformation>\n            </cl-video>"
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_video_component_1.CloudinaryVideo, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // all elements with an attached CloudinaryVideo
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_video_component_1.CloudinaryVideo));
        });
        it('creates a <video> element which encodes the directive attributes to the URL', function () {
            var video = des.children[0].nativeElement;
            // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
            expect(video.childElementCount).toBe(3);
            for (var i = 0; i < 3; i++) {
                expect(video.children[i].attributes.getNamedItem('src')).toBeDefined();
                expect(video.children[i].attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/c_scale,l_text:roboto_35_bold:SDK,w_300\/e_art:hokusai\/f_auto\/sample_video/));
                expect(video.children[i].attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/video\/upload/));
            }
            // verify interaction with underlying cloudinary-core lib
            expect(localCloudinary.videoTag).toHaveBeenCalledTimes(1);
        });
    });
    describe('Video with poster using kebab-case', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: "\n            <cl-video cloud-name=\"my_other_cloud\" public-id=\"watchme\" secure=\"true\" class=\"my-videos\"\n            poster='{\"cloud-name\": \"cloudinary\", \"gravity\": \"north\", \"start-offset\": \"28\",\n            \"transformation\": [{\"effect\": \"sepia\", \"fetch-format\": \"auto\"}]}'>\n            </cl-video>\n            "
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_video_component_1.CloudinaryVideo, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // Our element under test, which is attached to CloudinaryVideo
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_video_component_1.CloudinaryVideo));
        });
        it('creates a <video> element which encodes the directive attributes to the URL', function () {
            var video = des.children[0].nativeElement;
            // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
            expect(video.attributes.getNamedItem('poster').value).toEqual(jasmine.stringMatching(/cloudinary\/video\/upload\/e_sepia,f_auto\/g_north,so_28\/watchme.jpg/));
        });
    });
    describe('Video with poster using snake_case', function () {
        var TestComponent = (function () {
            function TestComponent() {
            }
            return TestComponent;
        }());
        TestComponent = __decorate([
            core_1.Component({
                template: "\n            <cl-video cloud_name=\"my_other_cloud\" public-id=\"watchme\" secure=\"true\" class=\"my-videos\"\n            poster='{ \"cloud_name\": \"cloudinary\", \"gravity\": \"north\", \"start_offset\": \"28\",\n            \"transformation\": [{\"effect\": \"sepia\", \"fetch_format\": \"auto\"}]}'>\n            </cl-video>\n            "
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_video_component_1.CloudinaryVideo, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // Our element under test, which is attached to CloudinaryVideo
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_video_component_1.CloudinaryVideo));
        });
        it('creates a <video> element which encodes the directive attributes to the URL', function () {
            var video = des.children[0].nativeElement;
            // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
            expect(video.attributes.getNamedItem('poster').value).toEqual(jasmine.stringMatching(/cloudinary\/video\/upload\/e_sepia,f_auto\/g_north,so_28\/watchme.jpg/));
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
                template: "\n            <cl-video cloud-name=\"my_other_cloud\" public-id=\"watchme\" secure=\"true\" class=\"my-videos\">\n                <cl-transformation overlay=\"text:arial_60:watchme\" gravity=\"north\" y=\"20\"></cl-transformation>\n            </cl-video>\n            "
            }),
            __metadata("design:paramtypes", [])
        ], TestComponent);
        var fixture;
        var des; // the elements w/ the directive
        beforeEach(function () {
            fixture = testing_1.TestBed.configureTestingModule({
                declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, cloudinary_video_component_1.CloudinaryVideo, TestComponent],
                providers: [{ provide: cloudinary_service_1.Cloudinary, useValue: localCloudinary }]
            }).createComponent(TestComponent);
            fixture.detectChanges(); // initial binding
            // Our element under test, which is attached to CloudinaryVideo
            des = fixture.debugElement.query(platform_browser_1.By.directive(cloudinary_video_component_1.CloudinaryVideo));
        });
        it('creates a <video> element which encodes the directive attributes to the URL', function () {
            var video = des.children[0].nativeElement;
            // Created <video> element should have 3 child <source> elements for mp4, webm, ogg
            expect(video.childElementCount).toBe(3);
            for (var i = 0; i < 3; i++) {
                expect(video.children[i].attributes.getNamedItem('src')).toBeDefined();
                expect(video.children[i].attributes.getNamedItem('src').value).toEqual(jasmine.stringMatching(/https:\/\/res.cloudinary.com\/my_other_cloud\/video\/upload\/g_north,l_text:arial_60:watchme,y_20\/watchme/));
            }
        });
    });
});
//# sourceMappingURL=cloudinary-video.component.spec.js.map