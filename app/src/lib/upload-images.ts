import { compressImage } from "./compress-image";
import { downloadImage } from "./download-img";

export default async function uploadImages(
  images: any[],
  compress = true,
  compressionFunc = compressImage
) {
  if (!images.length) {
    return [];
  }

  const formData = new FormData();

  for (let file of images) {
    // if its a link not a file
    if (file?.imgLink !== undefined) {
      const { imgLink, imgName } = file;
      file = await downloadImage(imgLink, imgName);
    }
    if (compress) file = await compressionFunc(file);
    formData.append("file", file);
  }

  formData.append("upload_preset", "threads-images");

  const data = await fetch("https://api.cloudinary.com/v1_1/dv2xxj5vi/image/upload", {
    method: "POST",
    body: formData,
  }).then((r) => r.json());

  return [data.secure_url];
}

export async function uploadImage(image: any, compress = true, compressionFunc = compressImage) {
  let uploadedImages = await uploadImages([image], compress, compressionFunc);
  if (!uploadImages?.length) return null;

  return uploadedImages[0];
}
