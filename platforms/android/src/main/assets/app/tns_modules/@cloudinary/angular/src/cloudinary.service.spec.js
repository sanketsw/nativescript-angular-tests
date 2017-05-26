"use strict";
// Using require instead of import until clodinary-core has typings and can be loaded by tsc
var cloudinaryCore = require('cloudinary-core');
var cloudinary_service_1 = require("./cloudinary.service");
var cloudName = 'service-test';
describe('Cloudinary service', function () {
    var config = {
        cloud_name: cloudName
    };
    var service = new cloudinary_service_1.Cloudinary(cloudinaryCore, config);
    it('Creates an instance of the service', function () {
        expect(service instanceof cloudinary_service_1.Cloudinary).toBe(true);
    });
    it('creates responsive urls by interacting with cloudinary core', function () {
        var imgElement = {};
        var options = {
            opt1: 'val1'
        };
        spyOn(service.cloudinaryInstance, 'cloudinary_update');
        spyOn(service.cloudinaryInstance, 'responsive');
        service.responsive(imgElement, options);
        expect(service.cloudinaryInstance.cloudinary_update).toHaveBeenCalledWith(imgElement, options);
        expect(service.cloudinaryInstance.responsive).toHaveBeenCalledWith(options, false);
    });
    it('creates an image url', function () {
        var publicId = 'image_public_id.jpg';
        var options = {
            width: '100',
            crop: 'fill',
            responsive: true
        };
        expect(service.url(publicId, options)).toEqual('http://res.cloudinary.com/service-test/image/upload/c_fill,w_100/image_public_id.jpg');
    });
    describe('isJsonLikeString', function () {
        it('identifies strings that start with { and end with }', function () {
            expect(cloudinary_service_1.isJsonLikeString('{"a":"1", "b":"2"}')).toBeTruthy();
        });
        it('ignores the actual content of the given string', function () {
            expect(cloudinary_service_1.isJsonLikeString('{I AM NOT INTERESTING}')).toBeTruthy();
        });
        it('returns false strings that do not start with { and end with }', function () {
            expect(cloudinary_service_1.isJsonLikeString('')).toBeFalsy();
            expect(cloudinary_service_1.isJsonLikeString(undefined)).toBeFalsy();
            expect(cloudinary_service_1.isJsonLikeString('foo: "bar"')).toBeFalsy();
        });
    });
    describe('isNamedNodeMap', function () {
        it('returns false for objects that are not an instance of NamedNodeMap', function () {
            expect(cloudinary_service_1.isNamedNodeMap('{"a":"1", "b":"2"}')).toBeFalsy();
            expect(cloudinary_service_1.isNamedNodeMap(undefined)).toBeFalsy();
            expect(cloudinary_service_1.isNamedNodeMap(null)).toBeFalsy();
            expect(cloudinary_service_1.isNamedNodeMap(123)).toBeFalsy();
        });
    });
    describe('transformKeyNamesFromKebabToSnakeCase', function () {
        it('Transforms property names of json-like strings from kebab-case to snake_case', function () {
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase('{"aaa-aaa":"1", "bbb-bbb":"2", "cc": "ccc-ccc"}')).toEqual({
                aaa_aaa: '1',
                bbb_bbb: '2',
                cc: 'ccc-ccc'
            });
        });
        it('Transforms property names of json-like strings spanning multi-lines from kebab-case to snake_case', function () {
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase("{\"aaa-aaa\":\"1\",\n            \"bbb-bbb\":\"2\",\n            \"cc\": \"ccc-ccc\"}")).toEqual({
                aaa_aaa: '1',
                bbb_bbb: '2',
                cc: 'ccc-ccc'
            });
        });
        it('Transforms property names of objects from kebab-case to snake_case', function () {
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase({ 'aaa-aaa': 1, 'bbb-bbb': 2, cc: 'ccc-ccc' })).toEqual({
                aaa_aaa: 1,
                bbb_bbb: 2,
                cc: 'ccc-ccc'
            });
        });
        it('does not affect primitive values', function () {
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase(123)).toEqual(123);
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase(undefined)).toBeUndefined();
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase('')).toEqual('');
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase('a b c')).toEqual('a b c');
        });
        it('iterates over array elements to transform its members', function () {
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase([{
                    'aaa-aaa': 'aaa-aaa',
                    'bbb-bbb': 'bbb-bbb',
                    'ccc': 'ccc'
                }, '{"xxx-xxx":"1", "yyy-yyy":"2", "zz": "zzz-zzz"}'])).toEqual([
                {
                    'aaa_aaa': 'aaa-aaa',
                    'bbb_bbb': 'bbb-bbb',
                    'ccc': 'ccc'
                },
                {
                    'xxx_xxx': '1',
                    'yyy_yyy': '2',
                    'zz': 'zzz-zzz'
                }
            ]);
        });
        it('transforms complex json-like objects into options', function () {
            expect(cloudinary_service_1.transformKeyNamesFromKebabToSnakeCase("{\"aaa-aaa\":\"1\",\n            \"bbb-bbb\":\"2\",\n            \"transform-ation\": [{ \"effect\": \"sepia\", \"fetch_format\": \"auto\"}]\n            }")).toEqual({
                aaa_aaa: '1',
                bbb_bbb: '2',
                transform_ation: [{
                        effect: 'sepia',
                        fetch_format: 'auto'
                    }]
            });
        });
    });
});
//# sourceMappingURL=cloudinary.service.spec.js.map