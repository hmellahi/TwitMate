const fs = require("fs");
const xlsx = require("xlsx");

// Load the Excel file
// const workbook = xlsx.readFile("./assets/TweetsElonMusk.csv"); // Replace with your Excel file path
const workbook = xlsx.readFile("./assets/sarcasm/test.csv"); // Replace with your Excel file path

// Assume the data is in the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet data to JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Loop through each row (tweet)
data.forEach((row, index) => {
  if (index > 20) return;
  // Check if the row has photos
  const photos = row.photos;
  console.log(row)

  if (photos && photos.length > 0) {
    console.log(row);
    console.log(`Tweet ${index + 1} Images:`);
    // photos.forEach((photo, photoIndex) => {
    //   // Download and save the image
    //   const imageBuffer = Buffer.from(photo, "base64");
    //   fs.writeFileSync(`tweet_${index + 1}_image_${photoIndex + 1}.png`, imageBuffer);
    //   console.log(`Image ${photoIndex + 1} saved.`);
    // });
  } else {
    console.log(`Tweet ${index + 1} has no images.`);
  }
});
