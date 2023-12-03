const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs'); // Required for file operations
const path = require('path'); // Required for file operations
const app = express();
const lostPet  = require("./routes/petRoutes")
const users = require("./routes/userRoutes")
const mongoose = require("mongoose");
const cors = require("cors")

// Configure Cloudinary (replace with your Cloudinary credentials)
// const cloudName = 'dazahzqle';
// const apiKey = '928332694374226';
// const apiSecret = 'gj2QqiIT1Oqy8HQI6MNsqMTLb2A';
// cloudinary.config({
//     cloud_name: cloudName,
//     api_key: apiKey,
//     api_secret: apiSecret
// });

app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://anandmedarametla:anand@anandmongotest.vddrebm.mongodb.net/?retryWrites=true&w=majority")
.then(console.log("MongoDB connected!"))
.catch(err => console.log(err))

// Set up Multer for handling file uploads
// const storage = multer.memoryStorage(); // Store the file in memory
// const upload = multer({ storage: storage });

// Handle file upload
// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         // Create a temporary file path
//         const tempFilePath = path.join(__dirname, 'temp', req.file.originalname);

//         // Write the file buffer to the temporary file
//         fs.writeFileSync(tempFilePath, req.file.buffer);

//         // Upload the temporary file to Cloudinary
//         const result = await cloudinary.uploader.upload(tempFilePath, {
//             folder: 'test', // Optional: specify a folder in your Cloudinary account
//         });

//         // Delete the temporary file
//         fs.unlinkSync(tempFilePath);

//         // Send back the Cloudinary image URL in the API response
//         console.log("Image Url", result.secure_url);
//         res.json({ imageUrl: result.secure_url });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Upload failed.' });
//     }
// });

app.use("/api/lostpet",lostPet)
app.use("/api/auth",users)

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
