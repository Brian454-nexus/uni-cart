const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const mockDataPath = path.join(__dirname, "src", "data", "mockData.js");
const imagesDir = path.join(__dirname, "public", "images");
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// Read the mockData.js file as text
let mockDataText = fs.readFileSync(mockDataPath, "utf-8");

// Extract all image URLs (product images and seller avatars)
const urlRegex = /https:\/\/[^"'\]\s)]+/g;
const allUrls = Array.from(new Set(mockDataText.match(urlRegex)));

const urlToLocal = {};

async function downloadAndReplace() {
  let count = 0;
  for (const url of allUrls) {
    const ext = path.extname(url.split("?")[0]) || ".jpg";
    const fileName = `img_${count++}${ext}`;
    const dest = path.join(imagesDir, fileName);
    urlToLocal[url] = `/images/${fileName}`;
    if (!fs.existsSync(dest)) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const buffer = await res.buffer();
        fs.writeFileSync(dest, buffer);
        console.log(`Downloaded ${url} -> ${dest}`);
      } catch (err) {
        console.error(`Failed to download ${url}:`, err.message);
      }
    } else {
      console.log(`Already exists: ${dest}`);
    }
  }

  // Replace URLs in mockDataText
  let newMockDataText = mockDataText;
  for (const [url, localPath] of Object.entries(urlToLocal)) {
    newMockDataText = newMockDataText.split(url).join(localPath);
  }

  // Write the updated mockData.js
  fs.writeFileSync(mockDataPath, newMockDataText, "utf-8");
  console.log("\nAll URLs replaced with local paths in mockData.js!");
}

downloadAndReplace();
