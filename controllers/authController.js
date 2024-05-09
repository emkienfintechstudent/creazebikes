import bcrypt from "bcrypt";
import db from '../config/connectDB.js';
import passport from "passport";
const saltRounds = 10 //băm bật khẩu 10 vòng
import { setupProductCategory, keys, getALLProductCategory } from "../utils/products/productCategorySetup.js";
import nodemailer from 'nodemailer';
import env from "dotenv"
env.config()
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
      function isValidUsername(username) {
        // Biểu thức chính quy để kiểm tra xem tên người dùng có chứa các ký tự đặc biệt không mong muốn
        const regex = /^[a-zA-Z0-9_]+$/; // Chỉ chấp nhận chữ cái (không dấu), số và dấu gạch dưới (_)
        return regex.test(username);
    }
      const passwordConfirm = req.body.passwordConfirm
      const email = req.body.email
      const password = req.body.passwordSignUp;
      const username = req.body.usernameSignUp
      const name = req.body.name
      const phoneNumber = req.body.phoneNumber
      const status = 1 
      var get_date_now = new Date();
      const date = get_date_now.toISOString().slice(0, 10);
      if(isValidUsername(username)) {
      if(passwordConfirm == password) {  
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
                "INSERT INTO users (username, password,name,created_at,phone_number,status_id,email) VALUES ($1, $2,$3,$4,$5,$6,$7) RETURNING *",
                [username, hash, name, date, phoneNumber,status,email]
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
      } }else{
        req.flash('signupError', 'Comfirm password incorrect!')
        res.redirect("/login");
      }} else{
        req.flash('signupError', 'Username must contain only letters, numbers, and underscores.');
        res.redirect("/login");
        return; // Dừng việc xử lý tiếp tục
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

    },
    async forgotPassword(req,res){
      await setupProductCategory()
  
      res.render("forgot_password.ejs", {productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,session:req.session,layout: './layouts/headerfooter'})
    },
    async newPassword(req,res){
      const username = req.body.username
      const email = req.body.email
      const result= await db.query('select email from users where username = $1', [username])
      const check_email = result.rows[0].email
      console.log(check_email)
      if (check_email != email) {
        res.json({message : "email do not match"})

      }else { 

   function generateRandomPassword(length) {
        var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
        var password = "";
        for (var i = 0; i < length; i++) {
          var randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }
        return password;
      }
      
      // Usage example:
      var password =   generateRandomPassword(12); // Generates a random password of length 12
      console.log(password);
      res.json({message : "email match" })
      var transporter = nodemailer.createTransport({
        service: 'gmail',
      
        auth: {
            user: 'crazebikescompany@gmail.com',
            pass: process.env.EMAIL_PASS
        }
    });

    var mailOptions = {
        from: 'crazebikescompany@gmail.com',
        to: req.body.email,
        subject: 'Crazebikes send your new password',
        
        html: `<h1> Your new password: ${password} </h1>  <p> Best regards</p><p>Thank you & Good luck!</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }

    });
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
          console.error("Error hashing new password:", err);
          return res.status(500).send("Internal Server Error");
      }

      try {
          const result = await db.query("UPDATE users SET password = $1 WHERE username = $2 returning *", [hash, username]);
      } catch (err) {
          console.error("Error updating password in database:", err);
          return res.status(500).send("Internal Server Error");
      }
  });
    }
    }
  }
}
export default AuthController