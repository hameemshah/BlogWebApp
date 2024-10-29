import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import router from "./routes/routes.js";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import session from "express-session";
import passportSetup from "./config/passport-setup.js";

env.config();

const port = process.env.PORT || 5000;

// Express app
const app = express();

// Middleware
app.use(
    session({
      secret: process.env.secret,
      resave: false,               // Do not resave session if unmodified
      saveUninitialized: false,     // Do not save uninitialized sessions
      cookie: { secure: false }     // Set to true if using HTTPS
    })
  );

// Initilize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use('/auth', authRoutes);
app.use(router);


// Create server
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})
