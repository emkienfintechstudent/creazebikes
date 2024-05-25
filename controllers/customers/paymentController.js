import { setupProductCategory, keys, getALLProductCategory } from "../../utils/products/productCategorySetup.js";
import db from "../../config/connectDB.js"
import moment from "moment";
import crypto from 'crypto';
import https from 'https';
function PaymentController() {
    return {
        async momoComfirm(req, res) {
            console.log("123")
            console.log(req.query.deliveryInfo)
            res.status(200).send('OK');
            const partnerCode = req.query.partnerCode;
            const orderId = req.query.orderId;
            const requestId = req.query.requestId;
            const amount = req.query.amount;
            const orderInfo = req.query.orderInfo;
            const orderType = req.query.orderType;
            const transId = req.query.transId;
            const resultCode = req.query.resultCode;
            const message = req.query.message;
            const payType = req.query.payType;
            const responseTime = req.query.responseTime;
            const extraData = req.query.extraData;
            const signature = req.query.signature;   
            const secretKey = req.query.secretKey  
        
             // Xây dựng chuỗi rawSignature để xác thực
            const rawSignature = `partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&amount=${amount}&orderInfo=${orderInfo}&orderType=${orderType}&transId=${transId}&resultCode=${resultCode}&message=${message}&payType=${payType}&responseTime=${responseTime}&extraData=${extraData}`;

            // Xác thực chữ ký
            const verifiedSignature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
            if (signature !== verifiedSignature) {
                return res.status(400).json({ message: 'Chữ ký không hợp lệ' });
            }

            if (resultCode === 0) {
                // Thanh toán thành công
                // Lưu đơn hàng vào cơ sở dữ liệu
                // Ví dụ: Lưu vào MongoDB (điều chỉnh theo cơ sở dữ liệu của bạn)
                try {
                
                    const date_now = new Date().toISOString().slice(0, 10);
                    const result = await db.query(
                        "INSERT INTO carts (items,address,phone_number,created_at,status_id) VALUES ($1, $2,$3,$4,$5) RETURNING *",
                        [items, address, phone, date_now, 3]
                    );
                    const cart_id = result.rows[0].id
                    const items = req.session.cart.items
                    let totalQuantity = 0
                    let totalPrice = 0
                    // thêm vào bảng order
                    for (let product of Object.values(items)) {
                        totalQuantity += product.qty
                        totalPrice += product.item.price
                        const result_id = await db.query(
                            `select id from orders order by id desc limit 1 `
                        );
                        const order_id = result_id.rows[0].id + 1
                        const result = await db.query(
                            "INSERT INTO orders  (id,created_at, product_id,user_id,quantity,cart_id) VALUES ($1, $2,$3,$4,$5,$6) RETURNING *",
                            [order_id, date_now, product.item.id, req.user.id, product.qty, cart_id]
                        );
                    };
                    await db.query(
                        `update carts
              set total_quantity = $1, total_price = $2 
              where id = $3`,
                        [totalQuantity, totalPrice, cart_id]
                    );
                    delete req.session.cart
                    req.flash('success', 'Order placed successfully')
                    res.redirect('/customer/orders')
                    res.status(200).json({ message: 'Đơn hàng đã được lưu thành công' });
                } catch (error) {
                    console.error('Lỗi cơ sở dữ liệu:', error);
                    res.status(500).json({ message: 'Lỗi cơ sở dữ liệu' });
                }
            } else {
                // Thanh toán thất bại hoặc trạng thái khác
                console.log(`Thanh toán thất bại: ${message}`);
                res.status(200).json({ message: 'Thanh toán không thành công' });
            }
        }
    }
}
export default PaymentController