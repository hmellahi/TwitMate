// import { User } from "./types/User";

import { User } from "@prisma/client";
import sharp from "sharp";
import { findMatchingFile } from "../../../lib/find-matching-file";
import { getRandomUsers } from "../../../lib/get-random-users";
import { prisma } from "../../../lib/prisma";
import { unixTimestampToDateTime } from "../../../lib/time-converter";
import { uploadImage } from "../../../lib/upload-images";
import { fetchUsers } from "../../../server-actions/user/user.actions";
import { compressImageWithSharp } from "./utils/compressImageWithSharp";

// import { User } from "./types/User";

const fs = require("fs");
const path = require("path");

// const { User } = require("./types/User");

const preparethreads = async (users: User[]) => {
  // Get the current directory
  const currentDir = __dirname;
  // Read the users.json file
  // Construct the full file path including the current directory
  const filePath = path.join(currentDir, "./data/threads/db.json");

  // Read the users.json file
  const data = fs.readFileSync(filePath, "utf-8");

  // Parse the JSON data into an object
  let threadsListObject = JSON.parse(data)._default;
  let threadsList = Object.values(threadsListObject);
  console.log(threadsList.length);
  // threadsList = threadsList.slice(0, 2);

  const savingPostsPromises = [];

  // Iterate over each user and print it
  for (let index = 0; index < threadsList.length; index++) {
    const thread: any = threadsList[index];
    const { created_utc, title, id: threadId, ups: upVotes } = thread;

    console.time(`Iteration ${index}`);

    const memesPath = `${currentDir}/data/threads/memes/`;
    // Read the thread thumbnail file
    const threadThubmnail = await findMatchingFile(memesPath, threadId);

    if (!threadThubmnail) {
      console.log(`post doesn't have thubmnail ${index + 1}`);
      continue;
    }

    const { matchingFile, fileExtension } = threadThubmnail;

    const imgPath = `${memesPath}${matchingFile}`;

    // Read the image file as a Buffer object
    const imgBuffer = fs.readFileSync(imgPath);

    // Calculate the lastModified timestamp
    const lastModifiedTimestamp = Date.now(); // Set to the current timestamp (or any appropriate value)
    // Create a File object if needed (for browser environments)
    // This step is only applicable in a browser context, not in Node.js
    const imgFile = new File([imgBuffer], matchingFile, {
      type: `image/${fileExtension}`,
      lastModified: lastModifiedTimestamp, // Set to the current timestamp
    });

    let threadImgThubmnail;
    // let s =
    //   "https://www.francetvinfo.fr/pictures/JyU1OsHtMgm8wMPLsINs32GNgug/0x0:635x357/2656x1494/filters:format(avif):quality(50)/2016/08/23/internet-troll.jpg";
    try {
      threadImgThubmnail = await uploadImage(imgFile, true, compressImageWithSharp);
    } catch (e) {
      console.log(`failed uploading ${index + 1}`, { e });
      continue;
    }
    // Use sharp to get image dimensionsd
    let width = 800,
      height = 800;
    try {
      const { width: imgWidth, height: imgHeight } = await sharp(imgBuffer).metadata();
      width = imgWidth || width;
      height = imgHeight || height;
    } catch (e) {
      console.log(`Failed getting dimensions for image ${index + 1}`);
      continue;
    }

    const threadThubmnailData = {
      imageUrl: threadImgThubmnail,
      width,
      height,
    };

    const authorId = users[index % users.length]?.id;
    if (!authorId) {
      console.log(`authorid isn't valid '${authorId}' for thread ${index + 1}`);
      continue;
    }

    // Calculate the number of likes for each thread
    const randomOffset = Math.floor(Math.random() * 40) + 1; // Generate a random number between 1 and 40
    const maxLikes = users.length - 1;
    const randomNumberOfLikes = Math.max(1, maxLikes - randomOffset); // Ensure it's at least 1
    let numberOfLikes = Math.floor(upVotes / 100 + randomOffset);
    if (numberOfLikes > users.length - 1) {
      numberOfLikes = randomNumberOfLikes;
    }
    console.log({ numberOfLikes, upVotes });

    console.log();

    // Randomly select users to like the thread
    const likedByUsers = getRandomUsers(users, numberOfLikes);

    const threadLikers = likedByUsers.map((user) => user.id);

    let generatedthread = {
      text: title,
      authorId,
      createdAt: unixTimestampToDateTime(created_utc),
    };

    savingPostsPromises.push(savethread(generatedthread, threadLikers, threadThubmnailData, index));

    // End measuring the time for this iteration
    console.timeEnd(`Iteration ${index}`);
  }

  await Promise.all(savingPostsPromises);
};

const savethreadLikes = async (threadLikers: Array<string>, threadId: string) => {
  const threadLikes = threadLikers.map((userId) => ({
    userId,
    threadId,
  }));

  await prisma.threadLikes.createMany({
    data: threadLikes,
    skipDuplicates: true, // Skip duplicates (if applicable)
  });
};

const savePostThumbnail = async (
  threadThubmnailData: any,
  threadId: string,
  threadOwnerId: string
) => {
  if (!threadThubmnailData) return;

  await prisma.threadImages.create({
    data: {
      threadId,
      ...threadThubmnailData,
      userId: threadOwnerId,
    },
  });
};

const savethread = async (
  thread: any,
  threadLikers: Array<string>,
  threadThubmnailData: any,
  index: number
) => {
  try {
    // save in db using prisma
    const createdThread = await prisma.thread.create({
      data: thread,
    });

    const { id: createdThreadId, authorId } = createdThread;

    const savethreadLikesPromise = savethreadLikes(threadLikers, createdThreadId);
    const savethreadThumbnailPromise = savePostThumbnail(
      threadThubmnailData,
      createdThreadId,
      authorId
    );

    await Promise.all([savethreadLikesPromise, savethreadThumbnailPromise]);

    console.log(`Created thread ${index + 1} in the database.`);

    return createdThread;
  } catch (e: any) {
    console.error("Error saving users to the database:", e.message);
  } finally {
    await prisma.$disconnect();
  }
};

const generatePosts = async () => {
  try {
    const appUsers: any | null = await fetchUsers({ isFake: true, limit: 1000 });

    if (!appUsers) {
      return;
    }

    await preparethreads(appUsers);

    console.log("Finished generatating users.");
  } catch (e: any) {
    console.error("Error reading or parsing users.json:", e);
    throw e;
  }
};

export default generatePosts;
