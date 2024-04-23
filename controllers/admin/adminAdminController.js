import {dataAdmin} from "../../services/adminService.js"
import bcrypt from "bcrypt";
import db from '../../config/connectDB.js';
const saltRounds = 10 //băm bật khẩu 10 vòng
function AdminAdminController(){
   return {
    async index(req,res) {
        const getdataAdmin = await dataAdmin()
        res.render("admin/adminAdmin.ejs", {admins:getdataAdmin,layout: 'admin/layouts/header_footer'})},
        
        async postAdminAdmin (req,res) {
            console.log(req.body)
             const password = req.body.password
              try { 
                const checkResult = await db.query("SELECT * FROM users WHERE username =$1",[req.body.username],);
                if(checkResult.rowCount > 0) {
                  res.redirect("/admin/admin" );
                }else{
                  bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                      console.error("Error hashing password:", err);
                    } else {
                      const result = await db.query(
                        "INSERT INTO users(username, password,name,phone_number,role_id,status_id,email,address,is_admin) VALUES ($1, $2,$3,$4,$5,1,$6,$7,true) RETURNING *",
                        [req.body.username,hash,req.body.name,req.body.phoneNumber,parseInt(req.body.role_id),req.body.email,req.body.address]
                      
                      );  console.log(result)
                      const admin = result.rows[0];
                      req.login(admin, (err) => {
                        console.log("success");
                        res.redirect("/admin/admin");
                      })
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