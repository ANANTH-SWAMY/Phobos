const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GOOGLE_MAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

app.post("/mail", (req, res) => {
  // console.log(req.body);
  const mailOptions = {
    to: req.body.email,
    subject: "Suspicious activity on network",
    text: "someone gonna get flagged 💀",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: JSON.stringify(error.message),
      });
    } else {
      console.log("Mail Sent Successfully!");
      res.status(200).json({
        message: "Success! Message Sent! ",
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
