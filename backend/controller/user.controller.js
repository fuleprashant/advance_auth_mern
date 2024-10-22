import userModel from "../model/user.model.js";
import { emailProvider } from "../utils/emailProvider.js";
import { genarateToken } from "../utils/generateToken.js";
import { responde } from "../utils/responde.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res) => {
  //   console.log("the sign-up fucntion is clicked");

  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return responde(
        res,
        400,
        "user already exist with same email plz check the email"
      );
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const verificationOTP = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("the verification code is", verificationOTP);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationOTP,
      OTPExpire: Date.now() + 10 * 60 * 1000,
    });

    await newUser.save();

    await emailProvider(newUser.email, verificationOTP);

    const token = genarateToken(newUser);
    res.cookie("jwttoken", token, { maxAge: 3600000 });

    return responde(res, 200, "User registered succesfully", {
      name: newUser.name,
      email: newUser.email,
      isVerified: false,
    });
  } catch (error) {
    return responde(res, 500, "Something went wrong");
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { verificationOTP } = req.body;
    const user = await userModel.findOne({ verificationOTP });

    console.log(user.verificationOTP);

    if (!user) {
      return responde(res, 400, "Invalid OTP");
    }

    console.log("OTP expire time", user.OTPExpire);
    console.log("current time", Date.now());

    if (user.OTPExpire < Date.now()) {
      return responde(res, 400, "OTP Expired");
    }

    user.isVerified = true;
    await user.save();

    return responde(res, 200, "Email verified succesfully", {
      id: user._id,
      name: user.name,
      email: user.email,
      isVerified: true,
    });
  } catch (error) {
    return responde(res, 500, "something went wrong check the API");
  }
};

export const Login = (req, res) => {
  //   console.log("the Loginfucntion is clicked");
  try {
    const { email, password } = req.body;
  } catch (error) {}
};
