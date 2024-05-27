import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js"
import crypto from 'crypto';
function PaymentController() {
    return {
        async momoComfirm(req, res) {
           console.log(req.body)
           await db.query(`update carts 
           set status_id = 14 where payment_id = $1` ,[req.body.orderId])
           delete req.session.cart
           req.flash('success','Order placed successfully')
           res.redirect('/customer/orders')
        }
    }
}
export default PaymentController