import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationOTP: {
    type: String,
    required: true,
  },
  OTPExpire: {
    type: Date,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;
