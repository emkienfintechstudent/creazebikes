import bcrypt from "bcrypt";
import db from '../config/connectDB.js';
import passport from "passport";
const saltRounds = 10 //băm bật khẩu 10 vòng
import { setupProductCategory, keys, getALLProductCategory } from "../utils/products/productCategorySetup.js";
function AuthController() {
  return {
    // LOGIN
    async login(req, res) {

      await setupProductCategory()
      res.render("login.ejs", {productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,session:req.session,layout: './layouts/headerfooter'})
    }
    ,
    postLogin(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { 
              req.flash('error', info.message); // Set flash message
              return res.redirect('/login');
          }
          req.logIn(user, function(err) {
              if (err) { return next(err); }
            
              return res.redirect('/');
          });
      })(req, res, next);
  }
       
,
    // SIGNUP
    async signup(req, res) {
      const password = req.body.passwordSignUp;
      const username = req.body.usernameSignUp
      const name = req.body.name
      const phoneNumber = req.body.phoneNumber
      const status = 1 
      var get_date_now = new Date();
      const date = get_date_now.toISOString().slice(0, 10);
      try {
        const checkResult = await db.query("SELECT * FROM users WHERE username =$1", [username]);
        if (checkResult.rowCount > 0) {
          console.log(checkResult.rows[0])
          req.flash('name', checkResult.rows[0].name)
          req.flash('phone_number', checkResult.rows[0].phone_number)
          req.flash('signupError', 'Username already taken, please enter a valid username!')
          res.redirect("/login");
        } else {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              const result = await db.query(
                "INSERT INTO users (username, password,name,created_at,phone_number,status_id) VALUES ($1, $2,$3,$4,$5) RETURNING *",
                [username, hash, name, date, phoneNumber,status]
              );
              const user = result.rows[0];
              req.login(user, (err) => {
                console.log("success");
                res.redirect("/home");
              })
            }
          });
        }
      } catch (err) {
        console.log(err)
        // res.render("404.ejs");
      }
    }
    ,
    //google login
    googleAuth(req, res) {
      passport.authenticate("google", {
        scope: ["profile", "email"],
      })
    },
    googleAuthCallback(req, res, next) {
      passport.authenticate("google", {
        successRedirect: "/shopping-cart",
        failureRedirect: "/login",
      })(req, res, next)
    }
    ,
    //LOGOUT
    logout(req, res) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  }
}
export default AuthController