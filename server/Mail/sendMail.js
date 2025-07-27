import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, subject, text, html) => {
  const info = await transporter.sendMail({
    from: 'dev.purvim@gmail.com',
    to,
    subject,
    text,
    html
  });
};

export default sendMail;
