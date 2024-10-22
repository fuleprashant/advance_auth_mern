import userModel from "../model/user.model.js";
import { emailProvider } from "../utils/emailProvider.js";
import { genarateToken } from "../utils/generateToken.js";
import { responde } from "../utils/responde.js";
import bcrypt from "bcrypt";
import validate from "validator";

// sign-up function
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

// otp-verify function
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

// login function
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

// forgot-paassword function
export const forgotpassword = async (req, res) => {
  //   console.log("forgot password function is clicked");

  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return responde(res, 404, "User not found with this email address");
    }

    // Generate a new OTP for password reset
    const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(resetOTP);

    // Set OTP expiration (10 minutes from now)
    user.verificationOTP = resetOTP;
    user.OTPExpire = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes;
    await user.save();

    // send this OTP to the user's email
    try {
      await emailProvider(user.email, resetOTP);
    } catch (emailError) {
      console.error("Error sending email OTP:", emailError);
      // If sending email fails, return an error response
      return responde(res, 500, "Failed to send OTP. Please try againlater.");
    }
    // Send success response
    return responde(res, 200, "OTP sent to your email for passwordreset.");
  } catch (error) {
    return responde(res, 500, "Something went wrong.");
  }
};

// password reset-function
export const resetPassword = async (req, res) => {
  //   console.log("reset password function is clicked");
  try {
    const { verificationOTP, newpassword } = req.body;
    // console.log(verificationOTP, newpassword);

    // Find user by verification OTP
    const user = await userModel.findOne({
      verificationOTP,
      OTPExpire: { $gt: Date.now() }, // Ensure OTP has not expired
    });

    // If user is not found or OTP is invalid or expired
    if (!user) {
      return responde(res, 400, "Invalid or expired OTP");
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newpassword, 15);
    // Update user's password only
    user.password = hashedPassword;
    // Save the updated user without validation errors
    await user.save({ validateModifiedOnly: true });

    // Send success response
    return responde(res, 200, "Password reset successfully.");
  } catch (error) {
    console.error("Error resetting password:", error);
    return responde(res, 500, "Something went wrong during password reset.");
  }
};

// logout function
export const logout = (req, res) => {
  //   console.log("You clicked the logout button");
  try {
    res.clearCookie("jwttoken");
    return responde(res, 200, "user logout succesfully");
  } catch (error) {
    console.error("Error during logout:", error);

    return responde(res, 500, "Something went wrong during logout.");
  }
};

// get the single user with the token

// export const getSingleUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     if (!userId) {
//       return responde(res, 400, "userId is required")
//     }

//   } catch (error) {}
// };

export const getSingleUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from route parameters

    // Validate that the userId is provided
    if (!userId) {
      return responde(res, 400, "UserId is required");
    }

    // Find the user by the given ID in the database
    const user = await userModel.findById(userId);

    // Check if user exists
    if (!user) {
      return responde(res, 404, "User not found");
    }

    // If user is found, send back user data
    return responde(res, 200, "User profile fetched successfully", user);
  } catch (error) {
    // Handle any other errors
    console.error("Error fetching user profile:", error);
    return responde(res, 500, "Something went wrong");
  }
};
