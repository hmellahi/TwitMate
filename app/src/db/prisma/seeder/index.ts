import { PrismaClient } from "@prisma/client";
import { assignThreadsToCommunities } from "./assign-threads-to-communities";

require("dotenv").config(); // Load environment variables from a .env file

const prisma = new PrismaClient();

// const databaseName = process.env.DATABASE_NAME; // Replace with your environment variable names
// const username = process.env.DATABASE_USERNAME;

// const backupFileName = "backup.sql"; // Specify the backup file name

// async function backupDatabase() {
//   try {
//     console.log("Backing up the database...");
//     execSync(`pg_dump -U ${username} -d ${databaseName} -f ${backupFileName}`, {
//       stdio: "inherit",
//     });
//     console.log("Database backup completed.");
//   } catch (error) {
//     console.error("Error creating a database backup:", error);
//   }
// }

// async function restoreDatabase() {
//   try {
//     console.log("Restoring the database...");
//     execSync(`psql -U ${username} -d ${databaseName} -f ${backupFileName}`, { stdio: "inherit" });
//     console.log("Database restore completed.");

//     // Delete the backup file after successful restore
//     console.log("Deleting the backup file...");
//     execSync(`rm -f ${backupFileName}`);
//     console.log("Backup file deleted.");
//   } catch (error) {
//     console.error("Error restoring the database:", error);
//   }
// }

async function main() {
  try {
    // Backup the database before making any changes
    // await backupDatabase();

    // Remove fake data
    console.log("Removing fake data...");
    // await removeFakeData(); // TODO UnComment
    console.log("Fake users, their posts, and post images have been removed.");

    // // Generate fake users
    // console.log("Generating Fake Users");
    // await generateUsers(); // TODO UnComment
    // console.log("Fake Users are generated");

    // // Generate posts
    console.log("Generating Posts");
    // await generatePosts(); // TODO UnComment
    console.log("Posts are generated");

    assignThreadsToCommunities();
    // // Restore the database
    // await restoreDatabase();
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
