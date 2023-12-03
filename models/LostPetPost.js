const mongoose = require("mongoose");

const lostPetSchema = mongoose.Schema({
  pet_owner_email:{type: String},
  pet_owner_contact:{type: String},
  date_lost:{type:String},
  time_lost:{type:String},
  pet_name:{type: String},
  species: {type: String},
  breed: {type: String},
  age: {type:Number},
  weight: {type:Number},
  pet_colour: {type: String},
  distinguish_marks:{type: String},
  personality: {type: String},
  medical_conditions: {type: String}, // Store the Cloudinary image URL here
  image_url: {type: String}, // Store the Cloudinary image URL here
  last_location:{type: String},
  latitude: { type: Number },
  longitude: { type: Number },
  // location: {
  //   type: { type: String, default: "Point" },
  //   coordinates: [Number],
  // },
});

// lostPetSchema.index({ location: "2dsphere" });
const LostPet =  mongoose.model("LostPet", lostPetSchema);
module.exports = LostPet
