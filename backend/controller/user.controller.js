import userModel from "../model/user.model.js";
import { emailProvider } from "../utils/emailProvider.js";
import { genarateToken } from "../utils/generateToken.js";
import { responde } from "../utils/responde.js";
import bcrypt from "bcrypt";
import validate from "validator";

export const signUp = async (req, res) => {
  //   console.log("the sign-up fucntion is clicked");

  try {
    const { name, email, password } = req.body;

    if (!validate.isEmail(email) || !email.endsWith("@gmail.com")) {
      return responde(
        res,
        400,
        "Please enter a valid email end with @gmail.com"
      );
    }

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

    // console.log("OTP expire time", user.OTPExpire);
    // console.log("current time", Date.now());

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

// export const Login = async (req, res) => {
//   //   console.log("the Loginfucntion is clicked");
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });

//     if (!user) {
//       return responde(res, 400, "Invalid email or the password");
//     }

//     if (user.isVerified) {
//       return responde(
//         res,
//         400,
//         "please verify your email before loggin this user is not exist"
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return responde(res, 400, "Invalid email or the password");
//     }

//     // Generate JWT token if login is successful
//     const token = genarateToken(user);
//     // Set token in cookies (1 hour expiration)
//     res.cookie("jwttoken", token, { maxAge: 3600000 });

//     return responde(res, 200, "Login Succesfully", {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       token,
//     });
//   } catch (error) {
//     responde(res, 500, "something went wrong plz check the API");
//   }
// };

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return responde(res, 400, "Invalid email or the password");
    }

    // Check if user is verified
    if (!user.isVerified) {
      return responde(res, 400, "please verify your email before logging in");
    }

    // Compare provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return responde(res, 400, "Invalid  the password");
    }

    // Generate JWT token if login is successful
    const token = genarateToken(user); // Corrected typo
    // Set token in cookies (1 hour expiration)
    res.cookie("jwttoken", token, { maxAge: 3600000 });

    return responde(res, 200, "Login Successfully", {
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    return responde(res, 500, "Something went wrong, please check the API");
  }
};
