import { compressImage } from "./compressImage";

export default async function uploadImages(images) {
  if (!images.length) {
    return [];
  }

  const formData = new FormData();

  for (const file of images) {
    console.log(file.size);
    let l = await compressImage(file);
    formData.append("file", l);
    console.log(l.size);
  }

  formData.append("upload_preset", "threads-images");

  const data = await fetch(
    "https://api.cloudinary.com/v1_1/dv2xxj5vi/image/upload",
    {
      method: "POST",
      body: formData,
    }
  ).then((r) => r.json());

  return [data.secure_url];
}
