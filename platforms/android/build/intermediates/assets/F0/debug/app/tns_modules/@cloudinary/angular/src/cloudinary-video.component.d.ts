import { ElementRef, QueryList, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export declare class CloudinaryVideo implements AfterViewInit, OnInit, OnDestroy {
    private el;
    private cloudinary;
    publicId: string;
    transformations: QueryList<CloudinaryTransformationDirective>;
    observer: MutationObserver;
    constructor(el: ElementRef, cloudinary: Cloudinary);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    loadVideo(publicId: string): void;
    setElementAttributes(element: any, attributesLiteral: any): void;
    appendSourceElements(element: any, html: any): void;
}
