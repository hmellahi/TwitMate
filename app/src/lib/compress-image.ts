import Compressor from "compressorjs";

export function compressImage(imageFile: File): Promise<File> {
  return new Promise((resolve, reject) => {
    new Compressor(imageFile, {
      quality: 0.7,
      maxWidth: 800,
      maxHeight: 800,
      convertSize: 20000,
      success: (compressedResult: File) => {
        // Resolve the promise with the compressed file
        resolve(compressedResult);
      },
      error: (error) => {
        // Handle the error by returning the original file
        console.error("Image compression error:", error);
        // You can also add any additional error handling here.
        // Resolve the promise with the original file
        resolve(imageFile);
      },
    });
  });
}
