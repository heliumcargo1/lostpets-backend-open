const nodemailer = require("nodemailer");

module.exports = async (email, data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "findmypet090@gmail.com",
        pass: "amuixqtiesxaletr",
      },
    });

    const mailOptions = {
      from: "uddinsafi032@gmail.com",
      to: email,
      subject: "Repoted Pet",
      text: `
        Someone has repoted Seeing your pet at "${data.location_found}"
         Pet Speceis : ${data.species},
         Pet Breed : ${data.breed}
         Pet Color : ${data.pet_color}
         Pet Weight : ${data.weight}
         Pet Dintinguising Marks : ${data.distinguish_marks}
         You can Contact The Person who reported at : ${data.founder_number} 
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log("Email sending error: " + error);
    throw error; // Rethrow the error to handle it in the calling function if needed
  }
};
