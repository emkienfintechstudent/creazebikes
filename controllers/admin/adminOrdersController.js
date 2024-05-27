import db from '../../config/connectDB.js';
import moment from "moment";
function AdminOrderController() {
    
    return {
       async index(req, res) {
        const result = await db.query(`select a.total_price, a.created_at, cart_id,c.name as customer_name,a.address,a.phone_number,a.status_id as status, payment_method from carts a join orders b on a.id = b.cart_id join users c on b.user_id = c.id order by cart_id desc`)
     
        res.render("admin/orders.ejs",{user: req.user,layout: 'admin/layouts/header_footer',orders:result.rows,moment:moment})
        
    },
    async detail(req, res) {
        console.log(req.params.id)
        const cart = await db.query('select items,status_id from carts where id = $1',[req.params.id])
        console.log(cart.rows[0].items)
        const user = await db.query(`select  name, birth_date,gender,username,a.phone_number,a.address, c.email from carts a join orders b on a.id= b.cart_id join users c on b.user_id = c.id
        where a.id = $1
        limit 1 `,[req.params.id])
        console.log(user.rows[0])
        res.render("admin/order_detail.ejs",{user: user.rows[0] ,id:req.params.id, status:cart.rows[0].status_id ,  items:cart.rows[0].items,layout: 'admin/layouts/header_footer',moment:moment})
        
    }
 
}
}

export default AdminOrderController;