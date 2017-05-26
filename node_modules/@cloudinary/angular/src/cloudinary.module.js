'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* App Module */
var core_1 = require("@angular/core");
var cloudinary_service_1 = require("./cloudinary.service");
var cloudinary_image_component_1 = require("./cloudinary-image.component");
var cloudinary_video_component_1 = require("./cloudinary-video.component");
var cloudinary_transformation_directive_1 = require("./cloudinary-transformation.directive");
var cloudinary_image_source_directive_1 = require("./cloudinary-image-source.directive");
// Export for lib consumers
var cloudinary_image_component_2 = require("./cloudinary-image.component");
exports.CloudinaryImage = cloudinary_image_component_2.CloudinaryImage;
var cloudinary_video_component_2 = require("./cloudinary-video.component");
exports.CloudinaryVideo = cloudinary_video_component_2.CloudinaryVideo;
var cloudinary_transformation_directive_2 = require("./cloudinary-transformation.directive");
exports.CloudinaryTransformationDirective = cloudinary_transformation_directive_2.CloudinaryTransformationDirective;
var cloudinary_image_source_directive_2 = require("./cloudinary-image-source.directive");
exports.CloudinaryImageSourceDirective = cloudinary_image_source_directive_2.CloudinaryImageSourceDirective;
var cloudinary_service_2 = require("./cloudinary.service");
exports.Cloudinary = cloudinary_service_2.Cloudinary;
exports.provideCloudinary = cloudinary_service_2.provideCloudinary;
exports.CLOUDINARY_LIB = new core_1.OpaqueToken('CLOUDINARY_LIB');
exports.CLOUDINARY_CONFIGURATION = new core_1.OpaqueToken('CLOUDINARY_CONFIGURATION');
// Export this function to Angular's AOT to work
function createCloudinary(cloudinaryJsLib, configuration) {
    return new cloudinary_service_1.Cloudinary(cloudinaryJsLib, configuration);
}
exports.createCloudinary = createCloudinary;
;
var CloudinaryModule = CloudinaryModule_1 = (function () {
    function CloudinaryModule() {
    }
    CloudinaryModule.forRoot = function (cloudinaryJsLib, cloudinaryConfiguration) {
        return {
            ngModule: CloudinaryModule_1,
            providers: [
                { provide: exports.CLOUDINARY_LIB, useValue: cloudinaryJsLib },
                { provide: exports.CLOUDINARY_CONFIGURATION, useValue: cloudinaryConfiguration },
                {
                    provide: cloudinary_service_1.Cloudinary,
                    useFactory: createCloudinary,
                    deps: [exports.CLOUDINARY_LIB, exports.CLOUDINARY_CONFIGURATION]
                }
            ]
        };
    };
    return CloudinaryModule;
}());
CloudinaryModule = CloudinaryModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            cloudinary_image_source_directive_1.CloudinaryImageSourceDirective,
            cloudinary_image_component_1.CloudinaryImage,
            cloudinary_video_component_1.CloudinaryVideo,
            cloudinary_transformation_directive_1.CloudinaryTransformationDirective
        ],
        exports: [
            cloudinary_image_source_directive_1.CloudinaryImageSourceDirective,
            cloudinary_image_component_1.CloudinaryImage,
            cloudinary_video_component_1.CloudinaryVideo,
            cloudinary_transformation_directive_1.CloudinaryTransformationDirective
        ]
    }),
    __metadata("design:paramtypes", [])
], CloudinaryModule);
exports.CloudinaryModule = CloudinaryModule;
var CloudinaryModule_1;
//# sourceMappingURL=cloudinary.module.js.map