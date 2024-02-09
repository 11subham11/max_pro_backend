const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const credentials = {
  host: process.env.HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
};

const transporter = nodemailer.createTransport(credentials);

module.exports = async (to, content) => {
  const contacts = {
    from: "info@maxprocomputer.com",
    to: to,
  };
  const email = Object.assign({}, content, contacts);
  console.log(email);
  try {
    await transporter.sendMail(email);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }
};
