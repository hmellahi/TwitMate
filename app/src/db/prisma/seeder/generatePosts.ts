// import { User } from "./types/User";

import { uploadImage } from "@/lib/upload-images";
import { Thread, User } from "@prisma/client";
import { fetchUsers } from "../../..//server-actions/user/user.actions";
import { getRandomUsers } from "../../../lib/getRandomUsers";
import { prisma } from "../../../lib/prisma";
import { unixTimestampToDateTime } from "../../../lib/time-converter";

// import { User } from "./types/User";

const fs = require("fs");
const path = require("path");

// const { User } = require("./types/User");

const preparePosts = async (users: User[]) => {
  // Get the current directory
  const currentDir = __dirname;
  // Read the users.json file
  // Construct the full file path including the current directory
  const filePath = path.join(currentDir, "./data/posts/db.json");

  // Read the users.json file
  const data = fs.readFileSync(filePath, "utf-8");

  // Parse the JSON data into an object
  let postsListObject = JSON.parse(data)._default;
  let postsList = Object.values(postsListObject);
  postsList = postsList.slice(0, 2);

  const PostsPerUser = Math.floor(postsList.length / users.length) || 1;

  // Iterate over each user and print it
  let postCreationPromises = postsList.map(async (post: any, index: number) => {
    const { created_utc, title, id: postId } = post;

    // Read the post thumbnail file
    const imgPath = `${currentDir}/data/posts/memes/${postId}.png`;
    console.log({ imgPath });

    // Read the image file as a Buffer object
    // const imgBuffer = fs.readFileSync(imgPath);

    // Create a File object if needed (for browser environments)
    // This step is only applicable in a browser context, not in Node.js
    // const imgFile = new File([imgBuffer], postId + ".png", { type: "image/png" });

    // const postImgThubmnail = await uploadImage(imgFile);

    // console.log({ imgFile });

    // likes [test if all good?]
    // then images <333
    // take 2 posts
    // read the file? print
    // add dummy images
    // add upload img of 2
    // seeeed

    // Upload Img to cloud
    // const UploadedThumbnails = await uploadImages([imgFile], false);
    // const thumbnailUrl = UploadedThumbnails[0];

    const authorIndex = Math.floor(index / PostsPerUser);
    const authorId = users[authorIndex]?.id;

    // Calculate the number of likes for each post
    const numberOfLikes = Math.floor(Math.min(users.length - 1, post.ups / 100));
    console.log({ numberOfLikes, up: post.ups });

    // Randomly select users to like the post
    const likedByUsers = getRandomUsers(users, numberOfLikes);

    return {
      text: title,
      authorId,
      createdAt: unixTimestampToDateTime(created_utc),
      likes: {
        create: likedByUsers.map((user) => ({
          userId: user.id,
        })),
      },
    };
  });

  return Promise.all(postCreationPromises);
};

// const savePostsThumbnails = async (preparedPosts, createdPosts) => {
//   let images = preparedPosts.map((post) => {
//     const { thumbnail, createdAt, authorId } = post;
//     const createdPost = createdPosts.find((element) => element.createdAt == createdAt);
//     if (!createdPost) return;

//     return {
//       imageUrl: thumbnail,
//       userId: authorId,
//       threadId: createdPost.id,
//     };
//   });

//   await prisma.threadImages.createMany({
//     data: images,
//     skipDuplicates: true, // Skip duplicates (if applicable)
//   });
// };

const savePosts = async (posts: Thread[]) => {
  // save in db using prisma
  try {
    const result = await prisma.thread.createMany({
      data: posts,
      skipDuplicates: true, // Skip duplicates (if applicable)
    });

    // await savePostsThumbnails(posts, createdPosts);

    console.log(`Created ${result.count} posts in the database.`);
  } catch (e: any) {
    console.error("Error saving users to the database:", e.message);
  } finally {
    await prisma.$disconnect();
  }
};

const generatePosts = async () => {
  try {
    const appUsers = await fetchUsers({ isFake: true });

    if (!appUsers) {
      return;
    }

    // console.log(appUsers);
    const posts = await preparePosts(appUsers);
    // console.log(JSON.stringify(posts));
    // console.log(posts[0].likes.createMany.data.length);
    await savePosts(posts);

    console.log("Finished generatating users.");
  } catch (e: any) {
    console.error("Error reading or parsing users.json:", e);
  }
};

export default generatePosts;
