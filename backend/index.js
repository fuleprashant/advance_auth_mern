import express from "express";
import dotenv from "dotenv";
import db from "./database/db.js";
import router from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import userGauth from "./model/user.gauth.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

db();

app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5174", // Your frontend URL
  credentials: true, // Allow credentials
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
};

// Use CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use("/user", router);
app.get("/", (req, res) => {
  res.send("here our server has been start ");
});

// setup the session
app.use(
  session({
    secret: "utdursyciu34769ufyrvkufdtka",
    resave: false,
    saveUninitialized: true,
  })
);

// now we initialize the password
app.use(passport.initialize());
app.use(passport.session());

// with the help of passport.js we send the client id and clientsecretId
// have passport jsno upyog karine tema clien id and clietsecretid apishu temaj url apisu

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"], // Add scopes here
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract email from profile.emails array
        const email = profile.emails[0].value;

        // Check if user already exists in your database
        let user = await userGauth.findOne({ email });
        if (!user) {
          // Create a new user if not found
          user = new userGauth({
            name: profile.displayName,
            email,
            image: profile.photos[0].value,
          });
          await user.save(); // Save new user to your database
        }
        return done(null, user); // Pass user to serializeUser
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// set the user below data without this both our data is not store..
passport.serializeUser((user, done) => {
  done(null, user); // Store entire user profile (or just user.id if you want minimal data)
});

passport.deserializeUser((user, done) => {
  done(null, user); // Retrieve full user profile from session
});

// now we initialize the googleauthlogin with help of passport.js
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
// for frontend if success then this or that
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5174/",
    failureRedirect: "http://localhost:5174/login",
  })
);

app.listen(port, () => {
  console.log(
    `the server has been start on the port number http://localhost:${port}`
  );
});
