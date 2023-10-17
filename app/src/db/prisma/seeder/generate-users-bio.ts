import { PrismaClient, User } from "@prisma/client";
import { askGPT } from "../../../lib/ask-gpt";

// Initialize the Prisma client
const prisma = new PrismaClient();

// Function to generate a fake bio (your actual implementation)
async function generateUserBio(user: User) {
  const { location, gender } = user;
  const generateUserBioPrompt = `Give me a witty bio for a '${gender}' living in ${location}. Must be humorous and entertaining, in one sentence maximum, keep it short, don't use quotes, ( add country flags if the answer mentions country..)`;

  //   const generateUserBioPrompt = `give me one sarcastic bio about a person '${gender}' from ${location}. in one/two sentence, like twitter user bios style, must be sarcastic and funny (without cotes)`;

  let response = await askGPT(generateUserBioPrompt);
  if (!response) {
    throw new Error("Failed to generate a response.");
  }

  return response;
}

export async function generateFakeUserBios() {
  try {
    // Retrieve all fake users at once
    const fakeUsers: User[] = await prisma.user.findMany({
      where: { isFake: true },
      take: 1000,
    });

    const batchSize = 10;
    let batchStart = 0;

    while (batchStart < fakeUsers.length) {
      // Process the fake users in batches of 10
      const batchUsers = fakeUsers.slice(batchStart, batchStart + batchSize);
      // Create an array of update promises for the current batch
      const updatePromises = batchUsers.map(async (user) => {
        const fakeBio = await generateUserBio(user); // Call the bio generation function
        user.bio = fakeBio; // Update the user's bio field
        return prisma.user.update({
          where: { id: user.id },
          data: { bio: fakeBio },
        });
      });

      // Use Promise.all to wait for all updates in the current batch to complete
      await Promise.all(updatePromises);

      // Move the batch start position to the next batch
      batchStart += batchSize;
      console.log(batchStart + '/' + fakeUsers.length);
    }

    console.log("Fake user bios generated and saved successfully!");
  } catch (error) {
    console.error("Error generating and saving fake user bios:", error);
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
}
