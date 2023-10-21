import { PrismaClient } from "@prisma/client";
import { assignThreadsToCommunities } from "./assign-threads-to-communities";
import generatePosts from "./generate-posts";
import generateUsers from "./generate-users";
import { generateFakeUserBios } from "./generate-users-bio";
import removeFakeData from "./remove-fake-data";

require("dotenv").config(); // Load environment variables from a .env file

const prisma = new PrismaClient();

async function main() {
  try {
    // Remove fake data
    console.log("Removing fake data...");
    await removeFakeData();
    console.log("Fake users, their posts, and post images have been removed.");

    // // Generate fake users
    console.log("Generating Fake Users");
    await generateUsers();
    console.log("Fake Users are generated");

    // // Generate posts
    console.log("Generating Posts");
    await generatePosts();
    console.log("Posts are generated");

    await assignThreadsToCommunities();

    await generateFakeUserBios();
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
