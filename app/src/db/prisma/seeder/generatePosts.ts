// import { User } from "./types/User";

import { unixTimestampToDateTime } from "@/lib/time-converter";
import uploadImages from "@/lib/upload-images";
import { fetchUsers } from "@/server-actions/user/user.actions";

// import { User } from "./types/User";

const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

// const { User } = require("./types/User");

const preparePosts = async (users) => {
  // Get the current directory
  const currentDir = __dirname;
  // Read the users.json file
  // Construct the full file path including the current directory
  const filePath = path.join(currentDir, "./data/posts/db.json");

  // Read the users.json file
  const data = fs.readFileSync(filePath, "utf-8");

  // Parse the JSON data into an object
  const postsList = JSON.parse(data).results;

  const PostsPerUser = Math.floor(postsList.length / users.length);
  console.log({ PostsPerUser });

  // Iterate over each user and print it
  let postCreationPromises = postsList.map(async (post, index) => {
    const { created_utc } = post;

    // Read the post thumbnail file
    const imgFile = fs.readFileSync(filePath, "utf-8");

    // Upload Img to cloud
    const UploadedThumbnails = await uploadImages([imgFile], false);
    const thumbnailUrl = UploadedThumbnails[0];

    const authorIndex = index / PostsPerUser;
    const authorId = users[authorIndex]?.id;

    return {
      text: "",
      authorId,
      thumbnailUrl,
      createdAt: unixTimestampToDateTime(created_utc),
    };
  });

  return Promise.all(postCreationPromises);
};

const savePostsThumbnails = async (preparedPosts, createdPosts) => {
  let images = preparedPosts.map((post) => {
    const { thumbnail, createdAt, authorId } = post;
    const createdPost = createdPosts.find((element) => element.createdAt == createdAt);
    if (!createdPost) return;

    return {
      imageUrl: thumbnail,
      userId: authorId,
      threadId: createdPost.id,
    };
  });

  await prisma.threadImages.createMany({
    data: images,
    skipDuplicates: true, // Skip duplicates (if applicable)
  });
};

const savePosts = async (posts) => {
  // save in db using prisma
  try {
    const result = await prisma.thread.createMany({
      data: posts,
      skipDuplicates: true, // Skip duplicates (if applicable)
    });

    await savePostsThumbnails(posts, createdPosts);

    console.log(`Created ${result.count} posts in the database.`);
  } catch (e) {
    console.error("Error saving users to the database:", e.message);
  } finally {
    await prisma.$disconnect();
  }
};

const generateUsers = async () => {
  try {
    const appUsers = fetchUsers({ isFake: true });
    console.log(appUsers);
    const posts = await preparePosts(appUsers);
    console.log(posts);
    // await savePosts(posts);

    console.log("Finished generatating users.");
  } catch (e) {
    console.error("Error reading or parsing users.json:", e.message);
  }
};

module.exports = {
  generateUsers,
};
