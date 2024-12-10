import nodemailer from 'nodemailer';
import { SMTP } from '../constants/authConstants.js';

const transporter = nodemailer.createTransport({
  host: process.env[SMTP.SMTP_HOST],
  port: Number(process.env[SMTP.SMTP_PORT]),
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env[SMTP.SMTP_USER],
    pass: process.env[SMTP.SMTP_PASSWORD],
  },
});

export function sendMail(message) {
  return transporter.sendMail(message);
}
