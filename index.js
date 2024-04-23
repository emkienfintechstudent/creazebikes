import express from "express";
import db from "./config/connectDB.js"
import passportInit from "./config/passport.js";
import passport from "passport";
import expressLayouts from "express-ejs-layouts";
import router from "./routes/web.js";
import session from "express-session";
import GoogleStrategy from "passport-google-oauth2"
import connectPgSimple from 'connect-pg-simple'; // Hoặc bạn có thể sử dụng một package khác để lưu trữ session
const pgSession = connectPgSimple(session);
const app = express();
const port = 3000;

 app.use(expressLayouts)
app.use(
  session({
    store: new pgSession({
      pool: db,
      tableName: 'session'
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: true,
      secure: false // ENABLE ONLY ON HTTPS
    }
  }
  )
);
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json())
// config template engine 
import configViewEngine from './config/viewEngine.js';
configViewEngine(app)
// khai báo route
app.use(router)
// connect db
db.connect();
passport.use("google", new GoogleStrategy({
  clientID: "206433335107-7nucg78e97p9rm0l21e5amgtli030406.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/auth/google/shopping-cart",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
},
  async (accessToken, refreshToken, profile, cb) => {
    try {

      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        profile.email,

      ]);
      var get_date_now = new Date();
      const date = get_date_now.toISOString().slice(0, 10);
      if (result.rows.length === 0) {
        const newUser = await db.query(
          "INSERT INTO users (email, password,name,created_at) VALUES ($1, $2,$3,$4)",
          [profile.email, "google", profile.displayName, date]
        );
        return cb(null, newUser.rows[0]);
      } else {
        return cb(null, result.rows[0]);
      }
    } catch (err) {
      return cb(err);
    }
  }
)
);

app.listen(port, () => {
  console.log(`Sever running on ${port}.`)
})