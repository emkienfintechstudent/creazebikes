import db from '../../config/connectDB.js';
import moment from "moment";
function AdminOrderController() {
    
    return {
       async index(req, res) {
        const result = await db.query(`select a.total_price, a.created_at, cart_id,c.name as customer_name,a.address,a.phone_number,a.status_id as status from carts a join orders b on a.id = b.cart_id join users c on b.user_id = c.id`)
     
        res.render("admin/orders.ejs",{layout: 'admin/layouts/header_footer',orders:result.rows,moment:moment})
        
    },
    async detail(req, res) {
        console.log(req.params.id)
        const result = await db.query('select items,status_id from carts where id = $1',[req.params.id])
        console.log(result.rows[0].items)

        res.render("admin/order_detail.ejs",{id:req.params.id, status:result.rows[0].status_id ,  items:result.rows[0].items,layout: 'admin/layouts/header_footer',moment:moment})
        
    }
 
}
}

export default AdminOrderController;