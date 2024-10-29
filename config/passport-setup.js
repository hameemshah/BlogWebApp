import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import db from "../models/model.js";
import env from "dotenv";
env.config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = result.rows[0];
        done(null, user);
    } catch (err) {
        console.log("Error getting user");
        console.log(err);
    }
});

passport.use(new GoogleStrategy({
    // options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // console.log("profile = ", profile)
        //check if user already exists
        try {
            const result = await db.query("SELECT * FROM users WHERE googleid = $1", [profile.id]);
            const user = result.rows;
            if (user.length === 0) {
                try {
                    const result_ = await db.query("INSERT INTO users (username, googleid, thumbnail) VALUES ($1, $2, $3)",[profile.displayName, profile.id, profile.photos[0].value]);
                    const newUser = result_.rows[0];
                    return done(null, newUser);
                } catch (err) {
                    console.log('Error saving google user.');
                    console.log(err);
                }
            } else {
                const currentUser = user[0];
                return done(null, currentUser);
            }
        } catch (err) {
            console.log('Error checking user exists');
            console.log(err);
        }
    })
)

export default passport;