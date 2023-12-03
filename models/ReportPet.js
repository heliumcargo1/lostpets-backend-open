const mongoose = require("mongoose")

const reportPetPost = mongoose.Schema({
  founder_number:{
    type: String,
  },
    species: {
        type: String,
      },
      breed: {
        type: String,
      },
      weight: {
        type: Number,
      },
      pet_color:{
        type:String,
      },
      distinguish_marks:{
        type:String,
      },
      location_found:{
        type:String,
      },
      // latitude: { type: Number },
      // longitude: { type: Number },
}) 

const ReportPet = mongoose.model("ReportPet",reportPetPost)

module.exports = ReportPet