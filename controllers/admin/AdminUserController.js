import db from '../../config/connectDB.js';
import moment from "moment";
function AdminUserController() {
    return {
       async index(req, res) {
        const result = await db.query(`select id,name,birth_date,gender,username,phone_number,address,created_at,status_id from users
        where is_admin is false 
        order by created_at asc
        limit 10`)
        res.render("admin/users.ejs",{ users : result.rows, layout: 'admin/layouts/header_footer',moment:moment})
        
    },
    async update(req, res) {
      const result = await db.query( `update users
      set status_id = $1
      where id = $2 returning *` ,[req.body.status,req.body.userId])
      console.log(result.rows)
}
    }
  }
export default AdminUserController;