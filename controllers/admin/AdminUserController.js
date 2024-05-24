import db from '../../config/connectDB.js';
import moment from "moment";
const saltRounds = 10 //băm bật khẩu 10 vòng
import bcrypt from "bcrypt";

function AdminUserController() {
  return {
    async index(req, res) {
      const result = await db.query(`select id,name,birth_date,gender,username,phone_number,address,created_at,status_id from users
        where is_admin is false  and created_at is not null
        order by created_at desc
        limit 300`)
      res.render("admin/users.ejs", { users: result.rows, layout: 'admin/layouts/header_footer', moment: moment })

    },
    async addUser(req, res) {
      console.log(req.body)
      const password = req.body.password;
      const username = req.body.username
      const name = req.body.name
      const phoneNumber = req.body.phone_number
      const address = req.body.address
      const gender = req.body.gender
      const status = 1
      const birth_date = req.body.birth_date
      var get_date_now = new Date();
      const date = get_date_now.toISOString().slice(0, 10);
      try {
        const checkResult = await db.query("SELECT * FROM users WHERE username =$1", [username]);
        if (checkResult.rowCount > 0) {
          console.log(checkResult.rows[0])
          res.json({message : "Username already taken"})
        } else {
          bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
            } else {
              const result = await db.query(
                "INSERT INTO users (username, password,name,created_at,phone_number,status_id,is_admin,address,gender,birth_date) VALUES ($1, $2,$3,$4,$5,$6,False,$7,$8,$9) RETURNING *",
                [username, hash, name, date, phoneNumber, status,address,gender,birth_date]
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

  }
}
export default AdminUserController;