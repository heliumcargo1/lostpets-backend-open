const express = require("express");
const { tmpdir } = require('os');
const { join } = require('path');
const { promises: fsPromises } = require('fs');
const cloudinary = require('cloudinary').v2;
const LostPet = require("../models/LostPetPost");
const ReportPet = require("../models/ReportPet")
const sendEmail = require("../utils/sendEmail");

const router = express.Router();
// Configure Cloudinary
const cloudName = 'dazahzqle';
const apiKey = '928332694374226';
const apiSecret = 'gj2QqiIT1Oqy8HQI6MNsqMTLb2A';
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
});


// Middleware to parse multipart form data
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




router.post("/create", upload.single("image"), async (req, res) => {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const {
        pet_owner_email,
        date_lost,
        time_lost,
        pet_owner_contact,
        pet_name,
        species,
        breed,
        age,
        weight,
        pet_colour,
        distinguish_marks,
        personality,
        medical_conditions,
        last_location
    } = req.body;
    const latitude = parseFloat(req.body.markerLat);
  const longitude = parseFloat(req.body.markerLng);
    try {
        // Create a new LostPet document with form data
        const newLostPet = new LostPet({
            pet_owner_email,
            date_lost,
        time_lost,
        pet_owner_contact,
            pet_name,
            species,
            breed,
            age,
            weight,
            pet_colour,
            distinguish_marks,
            personality,
            medical_conditions,
            last_location,
            latitude, // Set the latitude field
            longitude, // Set the longitude field
            // location: {
            //  type: "Point",
            // coordinates: [longitude, latitude], // Set coordinates array
    //   },
        });

        // Upload the image to Cloudinary
        if (req.file) {
            const tempFilePath = join(tmpdir(), req.file.originalname);
            await fsPromises.writeFile(tempFilePath, req.file.buffer);
    
            // Upload the temporary file to Cloudinary
            const result = await cloudinary.uploader.upload(tempFilePath, {
                folder: 'lost-pet-images', // Optional: You can specify a folder in Cloudinary
            });
    
            // Clean up: Delete the temporary file
            await fsPromises.unlink(tempFilePath);
            
            newLostPet.image_url = result.secure_url; // Store the image URL in your database
        }

        // Save the LostPet document to MongoDB
        await newLostPet.save();

        res.status(201).json({ message: 'Lost pet information saved successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while processing your request.', reason: err });
    }
});

router.post("/report", async (req, res) => {
    console.log("Req body", req.body.owner_email);
    sendEmail(req.body.owner_email,req.body.formData)
    const {
        owner_email,
        formData: {
            founder_number,
            species,
            breed,
            weight,
            pet_color,
            distinguish_marks,
            location_found,
            markerLat,
            markerLng,
        },
    } = req.body;

    const latitude = parseFloat(markerLat);
    const longitude = parseFloat(markerLng);
    console.log(latitude, longitude);

    try {
        const newReportPet = new ReportPet({
            founder_number,
            species,
            breed,
            weight,
            pet_color,
            distinguish_marks,
            location_found,
            latitude, // Set the latitude field
            longitude, // Set the longitude field
        });

        // Save the LostPet document to MongoDB
        await newReportPet.save();

        res.status(201).json({
            newReportPet,
            message: 'Reported pet information saved successfully.',
        });
    } catch (err) {
        console.error(err);
    }
});


router.get("/search/:location_found", async (req, res) => {
    const {location_found} = req.params
    try {
     
        
        // Query for posts within the specified radius of the given location
        const posts = await ReportPet.find({
            location_found
        });

        res.status(200).json({ posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});




// get all posts
router.get("/allposts", async (req, res) => {
    try {
      const lostPets = await LostPet.find(); // Fetch all lost pet records
  
      // Send the fetched data as JSON response
      res.status(200).json(lostPets);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching data.', reason: err });
    }
  });

module.exports = router;
