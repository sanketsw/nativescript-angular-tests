import { ModuleWithProviders, OpaqueToken } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import CloudinaryConfiguration from './cloudinary-configuration.class';
export { CloudinaryImage } from './cloudinary-image.component';
export { CloudinaryVideo } from './cloudinary-video.component';
export { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
export { Cloudinary, provideCloudinary } from './cloudinary.service';
export { CloudinaryConfiguration };
export declare const CLOUDINARY_LIB: OpaqueToken;
export declare const CLOUDINARY_CONFIGURATION: OpaqueToken;
export declare function createCloudinary(cloudinaryJsLib: any, configuration: any): Cloudinary;
export declare class CloudinaryModule {
    static forRoot(cloudinaryJsLib: any, cloudinaryConfiguration: any): ModuleWithProviders;
}
