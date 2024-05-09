import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js"
import moment from "moment";
function OrderController() {
  return {
   async index(req,res){
    await setupProductCategory()
    const result = await db.query(`select a.id as cart_id,a.address,a.phone_number, a.created_at,c.name as status from carts a join orders b on a.id = b.cart_id
    join status c on a.status_id = c.id
    where user_id = $1 
    group by a.id ,a.address,a.phone_number,a.created_at,c.name`, [req.user.id])
    const orders = result.rows
    res.render("order.ejs",{orders : orders,productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,session:req.session,layout: './layouts/headerfooter',moment:moment} )
   },
   async store(req,res){
    const address = req.body.address
    const phone=req.body.phone_number
    // thêm vào bảng cart trước    
    const date_now = new Date().toISOString().slice(0, 10);
    const result = await db.query(
      "INSERT INTO carts (items,address,phone_number,created_at,status_id) VALUES ($1, $2,$3,$4,$5) RETURNING *",
      [req.session.cart.items,address,phone,date_now,3]
    );
    const cart_id = result.rows[0].id 
    const items = req.session.cart.items
    let totalQuantity= 0
    let totalPrice = 0 
    // thêm vào bảng order
    for(let product of Object.values(items)) {
      totalQuantity +=  product.qty 
      totalPrice += product.item.price
      const result_id = await db.query(
        `select id from orders order by id desc limit 1 `
      );
      const order_id = result_id.rows[0].id +1 
      const result = await db.query(
        "INSERT INTO orders  (id,created_at, product_id,user_id,quantity,cart_id) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *",
        [order_id,date_now, product.item.id,req.user.id , product.qty, cart_id]
      );
    };
    await db.query(
      `update carts
      set total_quantity = $1, total_price = $2 
      where id = $3`,
      [totalQuantity,totalPrice,cart_id]
    );
    delete req.session.cart
    req.flash('success','Order placed successfully')
    res.redirect('/customer/orders')
   },
  async show(req,res){
    console.log(req.params.id)
    const result =await db.query(`select items from carts
    where id = $1
    `,[req.params.id])
    await setupProductCategory()

    res.render("singelOrder.ejs",{items:result.rows[0].items,productCategory: keys, productSubCategory: getALLProductCategory,user :req.user,layout: './layouts/headerfooter',moment:moment,session:req.session})
  } 
 

}
}
export default  OrderController