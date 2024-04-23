import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import db from '../config/connectDB.js';

function init(passport) {
    passport.use("local",
    new Strategy(async function verify(username, password, cb) {
      try {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          const status = user.status_id 
          
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (valid) {
                if(status == '1') {
                return cb(null, user)}
                else{
                  return cb(null, false, { message: "Your account is locked" }); // Passing error message as third argument
                }
              } else {
                return cb(null, false, { message: "Incorrect password!" }); // Passing error message as third argument
              }
            }
          });
        } else {
          return cb(null, false, { message: "User not found!" }); // Passing error message as third argument
        }
      } catch (err) {
        console.log(err);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });
}

export default init;
