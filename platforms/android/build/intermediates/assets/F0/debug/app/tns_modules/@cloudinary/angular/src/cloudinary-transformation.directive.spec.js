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
var cloudinary_transformation_directive_1 = require("./cloudinary-transformation.directive");
var TestComponent = (function () {
    function TestComponent() {
    }
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        template: "\n    <cl-transformation effect=\"art:hokusai\"></cl-transformation>\n    <cl-transformation format=\"png\" height=\"95\" width=\"95\" crop=\"thumb\" gravity=\"face\" radius=\"20\"></cl-transformation>\n    <cl-transformation overlay=\"text:arial_60:Sea%20Shell\" gravity=\"north\" y=\"20\"></cl-transformation>\n    <cl-transformation></cl-transformation>\n    "
    }),
    __metadata("design:paramtypes", [])
], TestComponent);
describe('CloudinaryTransformationDirective', function () {
    var fixture;
    var des; // the three elements w/ the directive
    beforeEach(function () {
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [cloudinary_transformation_directive_1.CloudinaryTransformationDirective, TestComponent]
        }).createComponent(TestComponent);
        fixture.detectChanges(); // initial binding
        // all elements with an attached CloudinaryTransformationDirective
        des = fixture.debugElement.queryAll(platform_browser_1.By.directive(cloudinary_transformation_directive_1.CloudinaryTransformationDirective));
    });
    it('should have four transformations', function () {
        expect(des.length).toBe(4);
    });
    it('Can get the attributes of the first transformation', function () {
        var dir = des[0].injector.get(cloudinary_transformation_directive_1.CloudinaryTransformationDirective);
        var attributes = dir.getAttributes();
        expect(attributes.length).toEqual(1);
        expect(attributes.item(0).name).toEqual('effect');
        expect(attributes.item(0).value).toEqual('art:hokusai');
    });
    it('Can get the attributes of the second transformation', function () {
        var dir = des[1].injector.get(cloudinary_transformation_directive_1.CloudinaryTransformationDirective);
        var attributes = dir.getAttributes();
        expect(attributes.length).toEqual(6);
    });
    it('Can get the attributes of the fourth (empty) transformation', function () {
        var dir = des[3].injector.get(cloudinary_transformation_directive_1.CloudinaryTransformationDirective);
        var attributes = dir.getAttributes();
        expect(attributes.length).toEqual(0);
    });
});
//# sourceMappingURL=cloudinary-transformation.directive.spec.js.map