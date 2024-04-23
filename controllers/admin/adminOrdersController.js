import db from '../../config/connectDB.js';
import moment from "moment";
function AdminOrderController() {
    
    return {
       async index(req, res) {
        const result = await db.query(`select a.total_price, a.created_at, cart_id,c.name as customer_name,a.address,a.phone_number,a.status_id as status from carts a join orders b on a.id = b.cart_id join users c on b.user_id = c.id`)
     
        res.render("admin/orders.ejs",{layout: 'admin/layouts/header_footer',orders:result.rows,moment:moment})
        
    },
    async update(req, res) {
      const result = await db.query( `update carts
      set status_id = $1
      where id = $2 returning *` ,[req.body.status,req.body.cartId])
      console.log(result.rows)
    }
}
}

export default AdminOrderController;