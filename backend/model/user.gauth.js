import mongoose from "mongoose";

const userGsuthSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
});

const userGauth = mongoose.model("GauthUser", userGsuthSchema);
export default userGauth;
