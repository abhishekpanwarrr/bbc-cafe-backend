import multer from "multer";
import fs from "fs";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//         const tempDir = './public/temp';

//     // Check if the directory exists, create it if it doesn't
//     if (!fs.existsSync(tempDir)) {
//       try {
//         fs.mkdirSync(tempDir, { recursive: true });
//       } catch (error) {
//         console.error('Error creating directory:', error);
//         return cb(error, null);
//       }
//     }

//     cb(null, tempDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// export const upload = multer({
//   storage,
// });

const targetDir = "./public/temp";

// Ensure that the parent directory exists
const parentDir = targetDir.substring(0, targetDir.lastIndexOf("/"));
if (!fs.existsSync(parentDir)) {
  fs.mkdirSync(parentDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if the target directory exists, create it if it doesn't
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
