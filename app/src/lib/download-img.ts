import axios from "axios";

// Function to download an image from a URL
export async function downloadImage(url: string, imageName: string): Promise<File> {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    
    // Extract the content type from response headers
    const contentType = response.headers["content-type"];
    
    // Create a File object from the downloaded data with dynamically determined type and name
    return new File([response.data], imageName, { type: contentType });
  } catch (error) {
    console.error("Image download error:", error);
    throw error; // You may want to handle the error more gracefully
  }
}