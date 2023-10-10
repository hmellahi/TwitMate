import sharp from "sharp";

export async function compressImageWithSharp(file: File) {
  try {
    const imageBuffer = await file.arrayBuffer();

    // Get the image dimensions without actually resizing
    const metadata = await sharp(imageBuffer).metadata();

    // Resize and reduce quality only if the original width is greater than 800 pixels
    const format = metadata.format || "jpeg"; // Default to JPEG format if the format is not available
    console.log(metadata.format);
    const compressedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 800 })
      .toFormat(format, { quality: 73 }) // Reduce quality to 80% for the same format
      .toBuffer();

    // Create a new File object with the compressed data
    const compressedFile = new File([compressedImageBuffer], file.name, {
      type: `image/${format}`,
    });

    return compressedFile;
  } catch (error) {
    console.error("Image compression failed:", error);
    return file; // Return the original file in case of an error
  }
}
