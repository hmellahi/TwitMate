const fs = require("fs").promises;
const path = require("path");

export async function findMatchingFile(currentDir: string, postId: string) {
  try {
    const files = await fs.readdir(currentDir);

    const matchingFile = files.find((file: string) => file.startsWith(postId));

    if (!matchingFile) {
      return null; // No matching files found
    }

    const fileExtension = path.extname(matchingFile).slice(1); // Remove the dot

    return { matchingFile, fileExtension };
  } catch (error) {
    throw error;
  }
}
