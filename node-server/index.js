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
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #333; font-size: 24px; margin-bottom: 20px;">
    Alert from Vajra!
  </h1>
  <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
    This email is to notify you of some malicious activity that was detected in your network.
    Please check your Admin Dashboard to learn more.
  </p>
  <div style="text-align: center;">
    <a
      href="https://1041-2401-4900-65b9-4faa-90b6-1805-b409-74e.ngrok-free.app"
      style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px;"
    >
      Proceed
    </a>
  </div>

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #666; font-size: 14px;">
    <p>&copy; ${new Date().getFullYear()} Vajra. All rights reserved.</p>
    <p>
      <a
        href="https://github.com/ANANTH-SWAMY/Vajra"
        style="color: #007bff; text-decoration: none;"
      >
        GitHub
      </a>
    </p>
  </div>
</div>
  
`,
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
