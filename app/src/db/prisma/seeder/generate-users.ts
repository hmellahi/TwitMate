// import { User } from "./types/User";

import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import fs from "fs";
import path from "path";
import { prisma } from "../../../lib/prisma";
import { uploadImage } from "../../../lib/upload-images";

const generateRandomUsers = async () => {
  // Get the current directory
  const currentDir = __dirname;
  // Read the users.json file
  // Construct the full file path including the current directory
  const filePath = path.join(currentDir, "./data/users.json");

  // Read the users.json file
  const data = fs.readFileSync(filePath, "utf-8");

  // Parse the JSON data into an object
  const users = JSON.parse(data).results;

  // Iterate over each user and print it
  let creationPromises = users.map(async (user: any, index: number) => {
    // Delay the creation of each user by 1 second
    const delayMilliseconds = 1000; // 1 second
    await new Promise((resolve) => setTimeout(resolve, index * delayMilliseconds));

    const {
      name,
      location: { city, country },
      gender,
    } = user;
    // Upload Profile Img to cloud
    const UploadedImage = await uploadImage(
      {
        imgLink: user.picture.large,
        imgName: user.login.username,
      },
      false
    );

    const userLocation = `${city}, ${country}`;

    const generatedUser = {
      username: user.login.username,
      name: `${name.first} ${name.last}`,
      image: UploadedImage,
      isFake: true,
      onboarded: true,
      bio: faker.person.bio(),
      location: userLocation,
      gender,
    };

    await saveUsers([generatedUser]);

    return generatedUser;
  });

  return Promise.all(creationPromises);
};

const saveUsers = async (users: User[]) => {
  // save in db using prisma
  try {
    const result = await prisma.user.createMany({
      data: users,
      // skipDuplicates: true, // Skip duplicates (if applicable)
    });

    console.log(`Created ${result.count} users in the database.`);
  } catch (e: any) {
    console.error("Error saving users to the database:", e.message);
  } finally {
    await prisma.$disconnect();
  }
};

const generateUsers = async () => {
  try {
    await generateRandomUsers();
    console.log("Finished generatating users.");
  } catch (e: any) {
    console.error("Error reading or parsing users.json:", e);
    throw e;
  }
};

export default generateUsers;
