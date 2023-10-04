// import { User } from "./types/User";

import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import uploadImages from "../../../lib/upload-images.ts";

// const { User } = require("./types/User");

const prepareRandomUsers = async () => {
  // Get the current directory
  const currentDir = __dirname;
  // Read the users.json file
  // Construct the full file path including the current directory
  const filePath = path.join(currentDir, "./data/users.json");

  // Read the users.json file
  const data = fs.readFileSync(filePath, "utf-8");

  // Parse the JSON data into an object
  const users = JSON.parse(data).results;
  const selectedUsers = users.slice(0, 2);

  // Iterate over each user and print it
  let creationPromises = selectedUsers.map(async (user: any) => {
    const {
      name,
      location: { city, country },
      gender,
    } = user;
    // Upload Profile Img to cloud
    const imgLink = user.picture.large;
    const UploadedImages = "wtf" || (await uploadImages([imgLink]));
    const userLocation = `${city}, ${country}`;

    const generatedUser = {
      username: user.login.username,
      name: `${name.first} ${name.last}`,
      image: UploadedImages[0],
      isFake: true,
      onboarded: true,
      bio: faker.person.bio(),
      location: userLocation,
      gender,
    };

    return generatedUser;
  });

  return Promise.all(creationPromises);
};

const saveUsers = async (users) => {
  // save in db using prisma
  try {
    const result = await prisma.user.createMany({
      data: users,
      skipDuplicates: true, // Skip duplicates (if applicable)
    });

    console.log(`Created ${result.count} users in the database.`);
  } catch (e: unknown) {
    console.error("Error saving users to the database:", e.message);
  } finally {
    await prisma.$disconnect();
  }
};

const generateUsers = async () => {
  try {
    const users = prepareRandomUsers();
    console.log(users);
    await saveUsers(users);

    console.log("Finished generatating users.");
  } catch (e) {
    console.error("Error reading or parsing users.json:", e.message);
  }
};

export default generateUsers;
