import { compressImage } from "./compress-image";

export default async function uploadImages(images, compress = true) {
  if (!images.length) {
    return [];
  }

  const formData = new FormData();

  for (let file of images) {
    if (compress) file = await compressImage(file);
    formData.append("file", file);
  }

  formData.append("upload_preset", "threads-images");

  const data = await fetch("https://api.cloudinary.com/v1_1/dv2xxj5vi/image/upload", {
    method: "POST",
    body: formData,
  }).then((r) => r.json());

  return [data.secure_url];
}
