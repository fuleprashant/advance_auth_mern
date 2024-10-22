import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transportemail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// console.log(process.env.EMAIL_USER);
// console.log(process.env.EMAIL_PASS);

// now we create a function who send the otp to the email

export const emailProvider = async (email, otp) => {
  // send mail with defined transport object
  try {
    const info = await transportemail.sendMail({
      from: process.env.EMAIL_USER, // by whom email will be sent
      to: email, // to email send
      subject: "Your email verification OTP",
      text: `Your OTP is ${otp}. It will be expired in 10 minites`,
      html: `<b>Your OTP is ${otp}. It will be expired in 10 minites</b>`,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.error(error, "error handling email OTP");
    throw new Error(error.message, "failed to send e-mail");
  }
};
