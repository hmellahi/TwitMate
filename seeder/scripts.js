const fs = require("fs");
const readline = require("readline");

const fn = () => {
  try {
    console.log("wtf");

    // Create a readable stream from the CSV file
    const inputStream = fs.createReadStream("./assets/data4.csv"); // Replace with your CSV file path
    const rl = readline.createInterface({
      input: inputStream,
      terminal: false,
    });

    let rowCount = 0;

    rl.on("line", (line) => {
      // Process only the first 2000 rows
      if (rowCount < 2000) {
        try {
          // Parse the JSON part of the line
          const jsonStart = line.indexOf("[");
          const jsonEnd = line.lastIndexOf("]");
          const json = line.substring(jsonStart, jsonEnd + 1);
          console.log(json)
          throw 'wtf'
          // const rowData = JSON.parse(json);

          // // Extract the profile image and hashtags
          // const profileImage = rowData[3];
          // const hashtags = rowData[2];

          // console.log(`Row ${rowCount + 1} Avatar: ${profileImage}`);
          // console.log(`Hashtags: ${hashtags.join(", ")}`);
        } catch (error) {
          console.error("Error parsing line:", error);
        }

        rowCount++;
      } else {
        rl.close(); // Stop processing after the first 2000 rows
      }
    });

    rl.on("close", () => {
      console.log("Finished reading CSV.");
    });
  } catch (e) {
    console.log({ e });
  }
};

try {
  fn();
} catch (e) {
  console.log({ e });
}
