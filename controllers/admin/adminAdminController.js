import {dataAdmin} from "../../services/adminService.js"
import bcrypt from "bcrypt";
import db from '../../config/connectDB.js';
const saltRounds = 10 //băm bật khẩu 10 vòng
function AdminAdminController(){
   return {
    async index(req,res) {
        const getdataAdmin = await dataAdmin()
        res.render("admin/admins.ejs", {admins:getdataAdmin,layout: 'admin/layouts/header_footer'})},
        
        async addAdmin (req,res) {
            console.log(req.body)
            const password = req.body.password;
            const username = req.body.username
            const name = req.body.name
            const phoneNumber = req.body.phone_number
            const address = req.body.address
            const gender = req.body.gender
            const status = 1
            const birth_date = req.body.birth_date
            const role_id = req.body.role_id
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
                      "INSERT INTO users (username, password,name,created_at,phone_number,status_id,is_admin,address,gender,birth_date,role_id) VALUES ($1, $2,$3,$4,$5,$6,True,$7,$8,$9,$10) RETURNING *",
                      [username, hash, name, date, phoneNumber, status,address,gender,birth_date,role_id]
                    );
                    const user = result.rows[0];
                   
                  }
                });
              }
            } catch (err) {
              console.log(err)
              // res.render("404.ejs");
            }
            },
            async updateAdminRole(req,res) {          
                await db.query(`update users 
                set role_id = $1 
                where id =$2`,[req.body.role,req.body.adminId])
}
}
}
export default AdminAdminController