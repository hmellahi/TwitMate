"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImage = void 0;
var compressorjs_1 = require("compressorjs");
function compressImage(image) {
    return new Promise(function (resolve, reject) {
        new compressorjs_1.default(image, {
            quality: 0.7,
            maxWidth: 800,
            maxHeight: 800,
            convertSize: 20000,
            success: function (compressedResult) {
                // Resolve the promise with the compressed file
                resolve(compressedResult);
            },
            error: function (error) {
                // Handle the error by returning the original file
                console.error("Image compression error:", error);
                // You can also add any additional error handling here.
                // Resolve the promise with the original file
                resolve(image);
            },
        });
    });
}
exports.compressImage = compressImage;
